import React from "react";
import LogoMark from "../LogoMark";
import { Mail, MapPin, Phone, Timer, User } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-[#0E2743] text-white/70 pt-7 lg:pt-14 mt-6 lg:mt-0'>
      <div className='max-w-310 mx-auto px-5 lg:px-12 flex flex-col lg:flex-row lg:justify-between gap-6.5 lg:gap-10 pb-5.5 lg:pb-9'>
        <div className='lg:flex-1'>
          <div className='flex items-center gap-2.5'>
            <LogoMark size={64} />
            <div className='flex flex-col leading-tight'>
              <span className="font-['Fraunces',_serif] font-semibold text-2xl text-white">
                Kimdienhomes
              </span>
              <span className='text-xs tracking-[0.09em] uppercase text-[#E7D3A9] font-semibold'>
                Property &amp; Homes
              </span>
            </div>
          </div>
          <p className='text-sm leading-relaxed mt-3 text-white/60 lg:max-w-75'>
            Nền tảng bất động sản uy tín, kết nối người mua, người bán và nhà đầu tư trên toàn quốc.
          </p>
          <div className='flex gap-x-4 mt-4'>
            {[FaFacebook, FaInstagram, FaYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="w-12 h-12 rounded-md border border-white/25 flex items-center justify-center text-white transition-all duration-200 hover:bg-[#C69A54] hover:border-[#C69A54] hover:text-[#0E2743] hover:-translate-y-0.5"
                >
                  <Icon size={30} />
                </a>
              ))}
          </div>
        </div>

        <div>
          <h4 className='text-sm text-white font-semibold mb-3'>Liên kết</h4>
          {["Trang chủ", "Mua bán", "Cho thuê", "Dự án", "Tin tức"].map((l) => (
            <a
              key={l}
              href='#'
              className='block text-sm text-white/65 mb-2.5 transition-colors duration-200 hover:text-[#E7D3A9]'
            >
              {l}
            </a>
          ))}
        </div>

        <div>
          <h4 className='text-sm text-white font-semibold mb-3'>Danh mục</h4>
          {["Nhà phố", "Căn hộ", "Biệt thự", "Đất nền", "Shophouse"].map((l) => (
            <a
              key={l}
              href='#'
              className='block text-sm text-white/65 mb-2.5 transition-colors duration-200 hover:text-[#E7D3A9]'
            >
              {l}
            </a>
          ))}
        </div>

        <div>
          <h4 className='text-sm text-white font-semibold mb-3'>Liên hệ</h4>
          <div className='flex flex-col gap-2.5'>
             <div className='flex items-center gap-2 text-sm'>
              <User size={18} className='text-[#C69A54] flex-none' /> Nguyễn Đức Minh
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <Phone size={18} className='text-[#C69A54] flex-none' /> 0909 888 777
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <Mail size={18} className='text-[#C69A54] flex-none' /> minhnguyen9686q6@gmail.com
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <MapPin size={18} className='text-[#C69A54] flex-none' /> TP. Hồ Chí Minh, Việt Nam
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <Timer size={18} className='text-[#C69A54] flex-none' /> 8:30 a.m - 6:00 p.m
            </div>
          </div>
        </div>
      </div>
      <div className='border-t border-white/15 py-4 text-center text-[10.5px] text-white/45'>
        © 2026 Kimdienhomes. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
