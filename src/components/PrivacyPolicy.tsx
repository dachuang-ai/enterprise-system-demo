import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';

export default function PrivacyPolicy({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#020617] text-slate-300">
      <div className="container mx-auto px-6 max-w-4xl">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-12 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
          返回首頁
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark p-8 md:p-12 rounded-[40px] border border-white/10"
        >
          <h1 className="text-4xl font-display font-bold text-white mb-12">隱私權政策</h1>
          
          <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-400 leading-relaxed">
            <p>數源行銷有限公司（以下稱「本公司」）重視您的個人資料與隱私權保護。本隱私權政策說明本網站於您瀏覽網站、填寫表單、來信、來電或使用本公司相關服務時，如何蒐集、處理、利用與保護您的個人資料。</p>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">一、適用範圍</h2>
              <p>本隱私權政策適用於本公司所經營之「SOHO 電商好幫手」相關服務頁面。若本網站連結至第三方網站、平台或服務，該第三方網站之隱私權政策不適用本政策，請您另行參閱該第三方網站之規範。</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">二、個人資料蒐集項目</h2>
              <p>當您使用本網站聯絡表單、諮詢服務、來信或來電時，本公司可能蒐集以下資料：</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>姓名、公司名稱、職稱。</li>
                <li>電話、Email、通訊或聯絡方式。</li>
                <li>您主動提供之需求內容、專案資訊、預算範圍、服務需求。</li>
                <li>網站使用紀錄，例如 IP 位址、瀏覽器類型、瀏覽時間、瀏覽頁面、Cookie 或類似技術資料。</li>
                <li>其他您主動提供並為服務評估、聯繫或合作所必要之資料。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">三、個人資料蒐集目的</h2>
              <p>本公司蒐集、處理及利用個人資料之目的如下：</p>
              <ol className="list-decimal pl-6 space-y-2 mt-4">
                <li>回覆您的諮詢、需求評估與服務說明。</li>
                <li>提供網站建置、電商系統、ERP/Ragic 整合、廣告投放、SEO/GEO、AI 商業應用與相關顧問服務。</li>
                <li>進行專案溝通、報價、合約、帳務、客服與後續維護。</li>
                <li>改善網站內容、服務流程與使用者體驗。</li>
                <li>進行必要之行政管理、法令遵循、爭議處理與權利保護。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">四、個人資料利用期間、地區、對象與方式</h2>
              <ul className="list-disc pl-6 space-y-4">
                <li><strong>利用期間：</strong>自您提供資料起，至蒐集目的消失、服務關係終止、保存期限屆滿，或依相關法令、合約及業務保存需求所必要之期間為止。</li>
                <li><strong>利用地區：</strong>中華民國境內，或因服務提供、雲端系統、網站託管、廣告平台、分析工具等必要範圍內之境外地區。</li>
                <li><strong>利用對象：</strong>本公司、受本公司委託處理業務之合作廠商、技術服務商、金流或廣告平台服務商，以及依法有調查或請求權限之機關。</li>
                <li><strong>利用方式：</strong>以電子郵件、電話、通訊軟體、表單、系統紀錄、資料分析、專案管理工具或其他合理方式進行聯繫、服務提供與資料管理處理。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">五、Cookie 與網站分析</h2>
              <p>本網站可能使用 Cookie、網站分析工具或類似技術，以了解網站流量、使用者行為與頁面成效，協助改善網站內容與服務品質。您可以透過瀏覽器設定拒絕或刪除 Cookie，但部分網站功能可能因此受到影響。</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">六、第三方服務</h2>
              <p>本網站可能使用第三方服務，例如網站主機、表單工具、Google Analytics、Google Ads、Meta、LINE、SEO 工具或其他數位服務。上述第三方服務可能依其自身政策蒐集或處理相關資料，請您參考各該第三方平台之隱私權政策。</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">七、個人資料保護</h2>
              <p>本公司將採取合理之技術與管理措施，保護您的個人資料，避免未經授權之存取、洩漏、竄改、毀損或遺失。但網際網路資料傳輸並非百分之百安全，本公司將於合理範圍內盡力保護您的資料安全。</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">八、個人資料當事人權利</h2>
              <p>依個人資料保護法規定，您得就本人個人資料向本公司請求查詢、閱覽、製給複製本、補充、更正、停止蒐集處理利用或刪除。若您欲行使前述權利，請透過本網站所列聯絡方式與本公司聯繫。</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">九、未提供資料之影響</h2>
              <p>若您不願提供必要之個人資料，本公司可能無法回覆您的諮詢、提供報價、進行專案評估或提供相關服務。</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">十、政策修訂</h2>
              <p>本公司得因法令變更、服務調整或營運需求，隨時修訂本隱私權政策。修訂後之內容將公告於本網站，不另行個別通知。</p>
            </section>

            <section className="pt-8 border-t border-white/5">
              <h2 className="text-2xl font-bold text-white mb-4">十一、聯絡方式</h2>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-2 text-sm">
                <p><strong>數源行銷有限公司</strong></p>
                <p>電話：05-2213336</p>
                <p>Email：zxunimedia@gmail.com</p>
                <p>地址：嘉義縣民雄鄉金興村忠義街166號</p>
                <p>統一編號：89175164</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
