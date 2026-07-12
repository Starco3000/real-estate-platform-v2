import React, { useState} from "react";
import {
  Home,
  Building2,
  Landmark,
  Store,
  MapPin,
  Search,
  Heart,
  ShieldCheck,
  UserCheck,
  TrendingUp,
  Banknote,
  BedDouble,
  Bath,
  Ruler,
  ChevronRight,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CATEGORIES = [
  { id: "house", label: "Nhà phố", count: "320 tin đăng", icon: Home },
  { id: "apartment", label: "Căn hộ", count: "410 tin đăng", icon: Building2 },
  { id: "villa", label: "Biệt thự", count: "96 tin đăng", icon: Landmark },
  { id: "shophouse", label: "Shophouse", count: "58 tin đăng", icon: Store },
  { id: "land", label: "Đất nền", count: "275 tin đăng", icon: MapPin },
];

const LISTINGS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    price: "6,8 tỷ",
    title: "Nhà phố 1 trệt 3 lầu mặt tiền đường Nguyễn Duy Trinh",
    location: "TP. Thủ Đức, TP. Hồ Chí Minh",
    area: "85 m²",
    beds: "4 PN",
    baths: "3 WC",
    featured: true,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=800&auto=format&fit=crop",
    price: "3,2 tỷ",
    title: "Căn hộ 2 phòng ngủ view sông tại Vinhomes Grand Park",
    location: "Quận 9, TP. Hồ Chí Minh",
    area: "68 m²",
    beds: "2 PN",
    baths: "2 WC",
    featured: true,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    price: "1,45 tỷ",
    title: "Đất nền thổ cư sổ hồng riêng, gần khu công nghiệp VSIP",
    location: "Thuận An, Bình Dương",
    area: "100 m²",
    beds: null,
    baths: null,
    featured: false,
  },
];

const WHY_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Pháp lý minh bạch",
    text: "Mọi tin đăng đều được kiểm tra sổ hồng, quy hoạch trước khi công bố.",
  },
  {
    icon: UserCheck,
    title: "Tư vấn tận tâm",
    text: "Đội ngũ chuyên viên đồng hành từ tìm kiếm đến khi nhận nhà.",
  },
  {
    icon: TrendingUp,
    title: "Định giá chính xác",
    text: "Dữ liệu thị trường cập nhật giúp mua bán đúng giá trị thực.",
  },
  {
    icon: Banknote,
    title: "Hỗ trợ vay vốn",
    text: "Kết nối ngân hàng đối tác, hỗ trợ thủ tục vay lãi suất tốt.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Tìm kiếm & tư vấn",
    text: "Chọn khu vực, loại hình và ngân sách, chuyên viên tư vấn liên hệ trong 15 phút.",
  },
  {
    num: "02",
    title: "Xem nhà thực tế",
    text: "Sắp xếp lịch xem nhà trực tiếp cùng chuyên viên, kiểm tra pháp lý tại chỗ.",
  },
  {
    num: "03",
    title: "Ký kết & bàn giao",
    text: "Hỗ trợ công chứng, sang tên và bàn giao nhà an toàn, đúng hẹn.",
  },
];

const STATS = [
  { num: "1.200+", label: "Tin đăng" },
  { num: "15", label: "Tỉnh thành" },
  { num: "9 năm", label: "Kinh nghiệm" },
  { num: "98%", label: "Khách hàng hài lòng" },
];

const TABS = [
  { id: "sale", label: "Mua bán" },
  { id: "rent", label: "Cho thuê" },
  { id: "project", label: "Dự án" },
];

export default function Homepage() {
  const [activeTab, setActiveTab] = useState("sale");
  const [favorites, setFavorites] = useState({});
  const [province, setProvince] = useState("all");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = () => {
    console.log({ province, propertyType, priceRange });
    // TODO: gọi API / router.push với query params tương ứng
  };

  const toggleFavorite = (id) => setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="w-full bg-[#F6F1E5] text-[#241F19] font-['Be_Vietnam_Pro',_sans-serif]">
      {/* local keyframes not covered by default Tailwind animations */}
      <style>{`
        @keyframes kdh-kenburns { 0% { transform: scale(1); } 100% { transform: scale(1.08); } }
        @keyframes kdh-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes kdh-pop { 0% { transform: scale(1); } 40% { transform: scale(1.35); } 100% { transform: scale(1); } }
      `}</style>

      {/* ---------------- Hero ---------------- */}
      <section className='relative h-95 lg:h-135 overflow-hidden'>
        <img
          src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop'
          alt='Nhà phố hiện đại'
          className='w-full h-full object-cover animate-[kdh-kenburns_20s_ease-in-out_infinite_alternate]'
        />
        <div className='absolute inset-0 bg-linear-to-b from-[#0E2743]/15 via-[#0E2743]/60 to-[#0E2743] lg:bg-linear-to-r lg:from-[#0E2743]/85 lg:via-[#0E2743]/50 lg:to-[#0E2743]/10' />

        <div className='absolute top-0 lg:left-12 z-10 h-full lg:translate-x-1/2 flex flex-col justify-center px-5 lg:px-12 max-w-140 lg:max-w-150'>
          <Reveal>
            <span className='uppercase tracking-[0.14em] text-[11px] font-semibold text-[#E7D3A9]'>
              Kimdienhomes · Bất động sản
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-['Fraunces',_serif] font-semibold text-white text-[26px] lg:text-[46px] leading-[1.24] lg:leading-[1.18] mt-2">
              Tổ ấm bắt đầu
              <br />
              từ <em className='text-[#E7D3A9] not-italic'>lựa chọn đúng</em>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className='text-white/85 text-[13.5px] lg:text-base leading-[1.55] lg:leading-relaxed mt-2.5 lg:mt-4 lg:max-w-115'>
              Hàng nghìn căn nhà, căn hộ và đất nền đã được xác minh pháp lý — tư vấn tận tâm từ đội
              ngũ Kimdienhomes trên toàn quốc.
            </p>
          </Reveal>
          <Reveal delay={300} className='hidden lg:flex gap-3.5 mt-7'>
            <button className='bg-[#C69A54] text-[#0E2743] font-semibold text-sm px-6 py-3 rounded-[10px] transition-all duration-200 hover:bg-[#d9b06c] hover:-translate-y-0.5 active:translate-y-0'>
              Tìm bất động sản
            </button>
            <button className='text-white font-semibold text-sm px-6 py-3 rounded-[10px] border border-white/50 transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0'>
              Đăng tin bán nhà
            </button>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Search card ---------------- */}
      <div className='relative z-20 -mt-15 lg:-mt-10 px-5 lg:px-0'>
        <Reveal delay={150} className='max-w-310 mx-auto lg:px-12'>
          <div className='bg-white rounded-[18px] shadow-[0_18px_34px_rgba(14,39,67,0.18)] p-4 lg:py-5 lg:px-6 lg:flex lg:items-center lg:gap-4'>
            <div className='flex gap-1.5 bg-[#F6F1E5] p-1 rounded-[11px] mb-3 lg:mb-0 lg:flex-none'>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    "flex-1 lg:flex-none text-center px-0 lg:px-4 py-2 rounded-lg text-[12.5px] font-semibold transition-colors duration-200",
                    activeTab === tab.id
                      ? "bg-[#16375E] text-white"
                      : "text-[#8B8172] hover:text-[#16375E]",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className='flex gap-2 mb-2 lg:mb-0 lg:contents'>
              <div className='flex-1 flex items-center gap-2 border-2 border-[#16375E]/10 lg:border-0 lg:border-r lg:border-[#16375E]/15 rounded-[10px] lg:rounded-none px-2.5 py-2 lg:pr-4 min-w-0'>
                <MapPin size={15} className='flex-none text-[#C69A54]' />
                <Select value={province} onValueChange={setProvince}>
                  <SelectTrigger className='border-none shadow-none outline-none bg-transparent text-sm text-[#241F19] w-full min-w-0 h-auto  focus:ring-0 focus-visible:ring-0'>
                    <SelectValue placeholder='Toàn quốc' />
                  </SelectTrigger>
                  <SelectContent position='popper'>
                    <SelectItem value='all'>Toàn quốc</SelectItem>
                    <SelectItem value='hcm'>TP. Hồ Chí Minh</SelectItem>
                    <SelectItem value='hn'>Hà Nội</SelectItem>
                    <SelectItem value='dn'>Đà Nẵng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='flex gap-2 mb-2 lg:mb-0 lg:contents'>
              <div className='flex-1 flex items-center gap-2 border border-[#16375E]/10 lg:border-0 lg:border-r lg:border-[#16375E]/10 rounded-[10px] lg:rounded-none px-2.5 py-2 lg:px-4 min-w-0'>
                <Home size={15} className='flex-none text-[#C69A54]' />
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className='border-none shadow-none outline-none bg-transparent text-[12.5px] text-[#241F19] w-full min-w-0 h-auto p-0 focus:ring-0 focus-visible:ring-0'>
                    <SelectValue placeholder='Loại hình' />
                  </SelectTrigger>
                  <SelectContent position='popper'>
                    <SelectItem value='house'>Nhà phố</SelectItem>
                    <SelectItem value='apartment'>Căn hộ</SelectItem>
                    <SelectItem value='land'>Đất nền</SelectItem>
                    <SelectItem value='villa'>Biệt thự</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex-1 flex items-center gap-2 border border-[#16375E]/10 lg:border-0 rounded-[10px] lg:rounded-none px-2.5 py-2 lg:px-4 min-w-0'>
                <Banknote size={15} className='flex-none text-[#C69A54]' />
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className='border-none shadow-none outline-none bg-transparent text-[12.5px] text-[#241F19] w-full min-w-0 h-auto p-0 focus:ring-0 focus-visible:ring-0'>
                    <SelectValue placeholder='Mức giá' />
                  </SelectTrigger>
                  <SelectContent position='popper'>
                    <SelectItem value='lt2'>Dưới 2 tỷ</SelectItem>
                    <SelectItem value='2-5'>2 - 5 tỷ</SelectItem>
                    <SelectItem value='5-10'>5 - 10 tỷ</SelectItem>
                    <SelectItem value='gt10'>Trên 10 tỷ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <button
              className='w-full lg:w-auto lg:flex-none flex items-center justify-center gap-2 bg-[#C69A54] text-[#0E2743] font-semibold text-sm rounded-[10px] py-3 lg:py-3.5 lg:px-7 transition-all duration-200 hover:bg-[#d9b06c] hover:shadow-lg hover:shadow-[#C69A54]/30 active:scale-[0.98]'
              onClick={handleSearch}
            >
              <Search size={16} />
              Tìm bất động sản
            </button>
          </div>
        </Reveal>
      </div>

      {/* ---------------- Stats ---------------- */}
      <div className='bg-[#16375E] mt-2.5 py-5.5 lg:py-9'>
        <div className='max-w-310 mx-auto px-5 lg:px-12 flex'>
          {STATS.map((s, i) => (
            <Reveal
              as='div'
              key={s.label}
              delay={i * 100}
              className='flex-1 text-center border-r border-white/15 last:border-r-0'
            >
              <div className="font-['Fraunces',_serif] font-semibold text-[#E7D3A9] text-xl lg:text-[32px]">
                {s.num}
              </div>
              <div className='text-white/75 text-[10px] lg:text-[13px] mt-1'>{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ---------------- Roofline divider ---------------- */}
      <div className='w-full h-4'>
        <svg viewBox='0 0 1240 16' preserveAspectRatio='none' className='block w-full h-full'>
          <polyline
            points='0,16 120,4 260,16 400,4 540,16 680,4 820,16 960,4 1100,16 1240,4'
            fill='none'
            stroke='#C69A54'
            strokeWidth='1.4'
          />
        </svg>
      </div>

      {/* ---------------- Categories ---------------- */}
      <section className='pt-10 lg:pt-16 px-5 lg:px-12 max-w-310 mx-auto'>
        <Reveal className='flex items-end justify-between mb-5 lg:mb-8 gap-3'>
          <div>
            <h2 className="font-['Fraunces',_serif] font-semibold text-[#16375E] text-xl lg:text-[28px]">
              Danh mục bất động sản
            </h2>
            <p className='hidden lg:block text-[#8B8172] text-[13px] mt-1.5 leading-relaxed max-w-115'>
              Khám phá theo loại hình phù hợp với nhu cầu ở thực hoặc đầu tư.
            </p>
          </div>
        </Reveal>

        <div className='flex lg:grid lg:grid-cols-5 gap-2.5 lg:gap-4.5 overflow-x-auto lg:overflow-visible pb-1 [&::-webkit-scrollbar]:hidden'>
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Reveal key={cat.id} delay={i * 80} className='flex-none w-19 lg:w-auto'>
                <button className='group w-full flex flex-col items-center gap-2 lg:gap-3.5 lg:bg-white lg:border lg:border-[#16375E]/10 lg:rounded-2xl lg:py-6 lg:px-3.5 transition-all duration-300 hover:-translate-y-1 lg:hover:shadow-lg lg:hover:shadow-[#16375E]/10 hover:border-[#C69A54]'>
                  <div className='w-13.5 h-13.5 lg:w-14 lg:h-14 rounded-2xl bg-white lg:bg-[#F6F1E5] border border-[#16375E]/10 lg:border-0 flex items-center justify-center text-[#16375E] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3'>
                    <Icon size={24} />
                  </div>
                  <span className='text-[11px] lg:text-sm text-center font-medium text-[#241F19]'>
                    {cat.label}
                  </span>
                  <span className='hidden lg:block text-[11.5px] text-[#8B8172]'>{cat.count}</span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------- Featured listings ---------------- */}
      <section className='pt-10 lg:pt-16 px-5 lg:px-12 max-w-310 mx-auto'>
        <Reveal className='flex items-end justify-between mb-5 lg:mb-8 gap-3'>
          <div>
            <h2 className="font-['Fraunces',_serif] font-semibold text-[#16375E] text-xl lg:text-[28px]">
              Bất động sản nổi bật
            </h2>
            <p className='hidden lg:block text-[#8B8172] text-[13px] mt-1.5 leading-relaxed max-w-115'>
              Được chọn lọc từ danh sách đã xác minh pháp lý và giá bán hợp lý nhất tuần.
            </p>
          </div>
          <a
            href='#'
            className='group flex items-center gap-1 text-[12.5px] lg:text-sm font-semibold text-[#C69A54] whitespace-nowrap'
          >
            Xem tất cả
            <ChevronRight
              size={15}
              className='transition-transform duration-200 group-hover:translate-x-1'
            />
          </a>
        </Reveal>

        <div className='flex flex-col lg:grid lg:grid-cols-3 gap-3.5 lg:gap-6'>
          {LISTINGS.map((item, i) => (
            <Reveal key={item.id} delay={i * 100}>
              <article className='group bg-white rounded-2xl overflow-hidden border border-[#16375E]/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#16375E]/10'>
                <div className='relative h-42.5 lg:h-50 overflow-hidden'>
                  <img
                    src={item.image}
                    alt={item.title}
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                  {item.featured && (
                    <span className='absolute top-2.5 left-2.5 bg-[#C69A54] text-[#0E2743] text-[10.5px] font-semibold px-2.5 py-1 rounded-full'>
                      Nổi bật
                    </span>
                  )}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    aria-label='Lưu tin'
                    className='absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[#16375E] transition-transform duration-150 active:scale-90'
                  >
                    <Heart
                      size={14}
                      className={[
                        favorites[item.id] ? "text-[#C24545]" : "text-[#16375E]",
                        favorites[item.id] ? "animate-[kdh-pop_0.35s_ease-out]" : "",
                      ].join(" ")}
                      fill={favorites[item.id] ? "currentColor" : "none"}
                    />
                  </button>
                </div>
                <div className='p-3.5 lg:p-5'>
                  <p className="font-['Fraunces',_serif] font-semibold text-[#16375E] text-[17px] lg:text-xl">
                    {item.price}
                  </p>
                  <p className='text-[13.5px] lg:text-[14.5px] font-medium mt-1 leading-snug text-[#241F19] lg:min-h-10.5'>
                    {item.title}
                  </p>
                  <div className='flex items-center gap-1.5 text-[11.5px] lg:text-[12.5px] text-[#8B8172] mt-1.5'>
                    <MapPin size={12} className='text-[#C69A54]' />
                    {item.location}
                  </div>
                  <div className='flex gap-3.5 lg:gap-4 mt-2.5 border-t border-[#16375E]/10 pt-2.5'>
                    <div className='flex items-center gap-1.5 text-[11.5px] lg:text-[12.5px] text-[#8B8172]'>
                      <Ruler size={14} className='text-[#16375E]' />
                      {item.area}
                    </div>
                    {item.beds && (
                      <div className='flex items-center gap-1.5 text-[11.5px] lg:text-[12.5px] text-[#8B8172]'>
                        <BedDouble size={14} className='text-[#16375E]' />
                        {item.beds}
                      </div>
                    )}
                    {item.baths && (
                      <div className='flex items-center gap-1.5 text-[11.5px] lg:text-[12.5px] text-[#8B8172]'>
                        <Bath size={14} className='text-[#16375E]' />
                        {item.baths}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Roofline divider ---------------- */}
      <div className='w-full h-4 mt-10 lg:mt-16'>
        <svg viewBox='0 0 1240 16' preserveAspectRatio='none' className='block w-full h-full'>
          <polyline
            points='0,4 120,16 260,4 400,16 540,4 680,16 820,4 960,16 1100,4 1240,16'
            fill='none'
            stroke='#C69A54'
            strokeWidth='1.4'
          />
        </svg>
      </div>

      {/* ---------------- Why choose us ---------------- */}
      <section className='pt-10 lg:pt-16 px-5 lg:px-12 max-w-310 mx-auto'>
        <Reveal className='mb-5 lg:mb-8'>
          <h2 className="font-['Fraunces',_serif] font-semibold text-[#16375E] text-xl lg:text-[28px]">
            Vì sao chọn Kimdienhomes
          </h2>
          <p className='hidden lg:block text-[#8B8172] text-[13px] mt-1.5 leading-relaxed max-w-115'>
            Cam kết đồng hành minh bạch trong từng bước giao dịch bất động sản.
          </p>
        </Reveal>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-5'>
          {WHY_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.title}
                delay={i * 90}
                className='bg-white border border-[#16375E]/10 rounded-[14px] lg:rounded-2xl p-3.5 lg:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#16375E]/10'
              >
                <div className='w-9 h-9 lg:w-11 lg:h-11 rounded-[10px] lg:rounded-xl bg-[#F6F1E5] flex items-center justify-center text-[#C69A54] mb-2.5 lg:mb-4'>
                  <Icon size={18} />
                </div>
                <h3 className='text-[13px] lg:text-base font-semibold text-[#16375E]'>
                  {item.title}
                </h3>
                <p className='text-[11.5px] lg:text-[13px] text-[#8B8172] mt-1.5 leading-relaxed'>
                  {item.text}
                </p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------- Steps ---------------- */}
      <section className='pt-10 lg:pt-16 px-5 lg:px-12 max-w-310 mx-auto'>
        <Reveal className='mb-5 lg:mb-8'>
          <h2 className="font-['Fraunces',_serif] font-semibold text-[#16375E] text-xl lg:text-[28px]">
            Quy trình 3 bước
          </h2>
          <p className='hidden lg:block text-[#8B8172] text-[13px] mt-1.5 leading-relaxed max-w-115'>
            Đơn giản, rõ ràng từ lúc tìm kiếm đến khi nhận nhà.
          </p>
        </Reveal>

        <div className='flex flex-col lg:grid lg:grid-cols-3 lg:relative'>
          <div className='hidden lg:block absolute top-5.5 left-[12%] right-[12%] h-px bg-[repeating-linear-gradient(to_right,#C69A54_0_8px,transparent_8px_16px)]' />
          {STEPS.map((step, i) => (
            <Reveal
              key={step.num}
              delay={i * 120}
              className={[
                "flex gap-3.5 lg:flex-col lg:text-center lg:px-5 py-3.5 lg:py-0",
                i !== STEPS.length - 1
                  ? "border-b border-dashed border-[#16375E]/10 lg:border-none"
                  : "",
              ].join(" ")}
            >
              <div className="font-['Fraunces',_serif] font-semibold text-[#C69A54] text-[22px] w-8 flex-none lg:w-11 lg:h-11 lg:rounded-full lg:bg-[#E7D3A9] lg:text-[#0E2743] lg:flex lg:items-center lg:justify-center lg:mx-auto lg:mb-4 lg:text-[17px] lg:border-4 lg:border-[#F6F1E5] lg:relative lg:z-10">
                {step.num}
              </div>
              <div>
                <h3 className='text-sm lg:text-[16.5px] font-semibold text-[#16375E]'>
                  {step.title}
                </h3>
                <p className='text-xs lg:text-[13.5px] text-[#8B8172] mt-1 lg:mt-2 leading-relaxed lg:max-w-65 lg:mx-auto'>
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Testimonial ---------------- */}
      <section className='pt-10 lg:pt-16 px-5 lg:px-12 max-w-310 mx-auto'>
        <Reveal className='flex justify-center'>
          <div className='bg-[#16375E] rounded-2xl p-5.5 lg:p-11 lg:max-w-180 lg:text-center'>
            <span className="block font-['Fraunces',_serif] text-[#C69A54] text-4xl lg:text-[52px] leading-[0.4] mb-1.5 animate-[kdh-float_4s_ease-in-out_infinite]">
              "
            </span>
            <p className="font-['Fraunces',_serif] italic text-white text-[14.5px] lg:text-[19px] leading-relaxed">
              Kimdienhomes giúp chúng tôi tìm được căn nhà ưng ý chỉ trong hai tuần, thủ tục pháp lý
              rõ ràng và minh bạch từng bước.
            </p>
            <div className='flex items-center gap-2.5 mt-4 lg:mt-6 lg:justify-center'>
              <div className='w-9 h-9 lg:w-10.5 lg:h-10.5 rounded-full bg-[#C69A54] text-[#0E2743] flex items-center justify-center font-semibold text-[13px] lg:text-sm'>
                TL
              </div>
              <div className='text-left'>
                <p className='text-[12.5px] lg:text-sm text-white font-semibold'>Trần Lệ</p>
                <p className='text-[11px] lg:text-[12.5px] text-[#E7D3A9]'>
                  Khách hàng tại TP. Thủ Đức
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------- CTA ---------------- */}
      <Reveal
        as='div'
        className='mx-5 mt-6 lg:mx-0 lg:mt-16 bg-[#C69A54] rounded-2xl lg:rounded-none p-5.5 lg:py-11 lg:px-12 text-center lg:text-left'
      >
        <div className='max-w-310 mx-auto lg:flex lg:items-center lg:justify-between lg:gap-5'>
          <div>
            <h2 className="font-['Fraunces',_serif] font-semibold text-[#0E2743] text-[19px] lg:text-[26px]">
              Bạn muốn bán hoặc cho thuê BĐS?
            </h2>
            <p className='text-[#0E2743]/75 text-[12.5px] lg:text-sm mt-2 leading-relaxed lg:max-w-120'>
              Đăng tin miễn phí, tiếp cận hàng nghìn khách hàng tiềm năng mỗi ngày cùng
              Kimdienhomes.
            </p>
          </div>
          <a
            href='#'
            className='inline-block mt-3.5 lg:mt-0 bg-[#16375E] text-white text-[13px] lg:text-[14.5px] font-semibold px-6.5 py-2.5 lg:px-7 lg:py-3.5 rounded-[10px] flex-none transition-all duration-200 hover:bg-[#0E2743] hover:-translate-y-0.5 active:translate-y-0'
          >
            Đăng tin ngay
          </a>
        </div>
      </Reveal>
    </div>
  );
}
