/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SystemModule {
  id: string;
  name: string;
  englishName: string;
  description: string;
  features: string[];
}

export interface InventoryItem {
  id: string;
  name: string;
  batchNo: string;
  expiryDate: string;
  warehouse: string;
  stock: number;
  status: '正常' | '低庫存' | '效期提醒';
}

export interface ReconciliationLog {
  id: string;
  invoiceNo: string;
  party: string;
  type: '應收' | '應付';
  amount: number;
  paidAmount: number;
  status: '未付款' | '部分付款' | '處理中' | '已結清';
}

export interface RolePermission {
  id: string;
  role: string;
  description: string;
  permissions: {
    dashboard: 'W' | 'R' | '-';
    products: 'W' | 'R' | '-';
    suppliers: 'W' | 'R' | '-';
    inventory: 'W' | 'R' | '-';
    billing: 'W' | 'R' | '-';
    permissions: 'W' | 'R' | '-';
  };
}

export interface AuditLog {
  id: string;
  time: string;
  operator: string;
  role: string;
  action: string;
  target: string;
  status: '成功' | '警告';
}
