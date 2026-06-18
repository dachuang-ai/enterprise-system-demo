import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';

export default function TermsOfService({ onBack }: { onBack: () => void }) {
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
          <h1 className="text-4xl font-display font-bold text-white mb-12">服務條款</h1>
          
          <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-400 leading-relaxed">
            <p>歡迎您使用「SOHO 電商好幫手」相關服務頁面及數源行銷有限公司（以下稱「本公司」）所提供之相關服務。當您瀏覽本網站、提出諮詢、委託本公司提供服務或使用本網站內容時，即表示您已閱讀、理解並同意本服務條款。</p>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">一、服務範圍</h2>
              <p>本公司提供之服務包含但不限於：</p>
              <ol className="list-decimal pl-6 space-y-2 mt-4 text-sm">
                <li>電商購物車、一頁式購物車、ERP 企業雲端整合與電商相關系統服務。</li>
                <li>Ragic 多平台整合、表單資料庫、流程自動化與營運管理系統規劃。</li>
                <li>Google / FB / IG / LINE 廣告代操、帳號設定、廣告策略、成效追蹤與數據分析。</li>
                <li>客製商業網站、無障礙網站、Landing Page、SEO/GEO 搜尋優化與媒體推廣企劃。</li>
                <li>融資計劃書、商業企劃、AI 商業流程整合、AI 量化交易研究系統與資料分析相關服務。</li>
                <li>其他經雙方另行約定之顧問、技術、行銷或專案服務。</li>
              </ol>
              <p className="mt-4">實際服務內容、交付項目、時程、費用與驗收方式，應以雙方確認之報價單、合約、工作說明或書面紀錄為準。</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">二、網站資訊說明</h2>
              <p>本網站所載之服務介紹、圖片、數據、功能說明與案例展示，僅供一般參考。本公司得依實際服務條件、技術限制、平台政策、客戶需求與第三方系統規則調整服務內容。</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">三、服務委託與資料提供</h2>
              <p>您委託本公司提供服務時，應提供正確、完整且合法之資料、素材、帳號權限、品牌資訊、產品內容、廣告素材、網站資料或其他專案必要資訊。若因您提供資料不完整、不正確、延遲提供或侵害第三方權利，導致專案延誤、錯誤、損害或法律爭議，應由您自行負責。</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">四、第三方平台與外部服務</h2>
              <p>本公司服務可能涉及 Google、Meta、LINE、Ragic、網站主機、網域、金流、物流、廣告平台、SEO 工具、AI 工具或其他第三方服務。第三方平台之帳號審核、政策變更、費率、廣告成效、系統穩定性、API 權限、資料限制或服務中斷，非本公司可控制之範圍。</p>
              <p className="mt-4">若因第三方平台政策、審核、限制、停權、費用調整或系統異常導致服務受影響，本公司將協助處理，但不保證一定能恢復、通過審核或達成特定結果。</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">五、廣告與 SEO/GEO 成效說明</h2>
              <p>本公司可依專業經驗提供廣告投放、SEO/GEO、媒體推廣與數據優化服務，但不保證特定排名、曝光、點擊、轉換、營收、ROAS、詢問數或業績結果。相關成效將受市場競爭、預算、素材、產業、網站體驗、商品力、平台演算法及使用者行為等因素影響。</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">六、AI 與量化研究服務說明</h2>
              <p>本公司提供之 AI 量化交易研究系統、AI 策略研究、回測、資料分析或模型建議，均屬研究、分析與技術輔助用途，不構成投資建議、獲利保證、代操承諾或金融商品推薦。任何投資、交易或商業決策，應由使用者自行評估並承擔風險。</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">七、智慧財產權</h2>
              <p>本網站之文字、圖片、設計、程式、版面、商標、服務名稱、圖示及其他內容，除另有標示或雙方另行約定外，均屬本公司或合法授權人所有。未經本公司書面同意，不得任意重製、修改、散布、公開傳輸、商業使用或作為其他用途。</p>
              <p className="mt-4">客戶提供予本公司之品牌素材、商標、圖片、文字、資料或其他內容，仍歸客戶或原權利人所有。客戶應擔保其提供之素材具有合法使用權。</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">八、報價、付款與交付</h2>
              <p>各項服務之費用、付款方式、交付內容、修改次數、維護範圍、保固條件與時程，應以雙方書面確認內容為準。若客戶新增需求、變更範圍、延遲提供資料或要求額外修改，本公司得視情況另行報價或調整交期。</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">九、責任限制</h2>
              <p>在法律允許範圍內，本公司對因使用本網站、第三方平台、服務中斷、資料錯誤、外部系統異常、網路問題、不可抗力或非本公司可控制因素所造成之間接損害、營業損失、資料遺失、預期利益損失，不負賠償責任。</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">十、條款修訂</h2>
              <p>本公司得依服務調整、法令變更或營運需求，隨時修訂本服務條款。修訂後之內容將公告於本網站，不另行個別通知。</p>
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
