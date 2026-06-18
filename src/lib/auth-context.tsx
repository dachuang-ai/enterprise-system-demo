"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./supabase";
import { Session, User } from "@supabase/supabase-js";

export type Role = "ADMIN" | "OPERATOR";

interface Profile {
  id: string;
  role: Role;
  project_id?: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isOperator: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        // If profile doesn't exist, create a default one
        if (error.code === 'PGRST116' || error.message.includes('No rows')) {
          const defaultProfile = {
            id: userId,
            role: "OPERATOR" as Role,
            project_id: null,
            name: userId.split('@')[0]
          };
          setProfile(defaultProfile);
        } else {
          // For other errors, set a minimal default profile
          setProfile({
            id: userId,
            role: "OPERATOR" as Role,
            project_id: null,
            name: userId.split('@')[0]
          });
        }
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error("Unexpected error fetching profile:", err);
      // Set minimal default profile on any error
      setProfile({
        id: userId,
        role: "OPERATOR" as Role,
        project_id: null,
        name: userId.split('@')[0]
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const isAdmin = profile?.role === "ADMIN";
  const isOperator = profile?.role === "OPERATOR";

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, isAdmin, isOperator, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
