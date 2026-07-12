import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { navigationLinks } from "@/lib/constants";
import { Button } from "../ui/button";
import { ChevronDown, HeartIcon, Phone, Menu, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { LoginForm } from "../auths/login-form";
import { SignupForm } from "../auths/signup-form";
import LogoMark from "../LogoMark";



const Header = () => {
  const [mode, setMode] = useState("login");
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      setMobileSubmenuOpen(null);
    }
  }, [menuOpen]);

  return (
    // <header
    //   className={[
    //     "sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border transition-shadow duration-300",
    //     scrolled ? "shadow-md shadow-primary/5" : "shadow-none",
    //   ].join(" ")}
    // >
    //   <div className='max-w-310 mx-auto px-4 lg:px-8 flex items-center justify-between py-3'>
    //     <Link to='/' className='flex items-center gap-2.5 shrink-0'>
    //       <img src='/logo2.png' alt='Kimdienhomes' className='h-14 w-auto' />
    //     </Link>
    //     <NavigationMenu className='space-x-4'>
    //       <NavigationMenuList>
    //         {navigationLinks.map((element) => (
    //           <Fragment key={element.id}>
    //             {element.hasSub && (
    //               <NavigationMenuItem className='mx-1'>
    //                 <NavigationMenuTrigger className='text-primary-foreground hover:text-accent'>
    //                   {element.name}
    //                 </NavigationMenuTrigger>
    //                 <NavigationMenuContent className='flex flex-col min-w-80'>
    //                   {element.subs.map((item) => (
    //                     <NavigationMenuLink
    //                       key={item.pathname}
    //                       className='px-4 font-medium rounded-md hover:bg-accent cursor-pointer'
    //                     >
    //                       {item.name}
    //                     </NavigationMenuLink>
    //                   ))}
    //                 </NavigationMenuContent>
    //               </NavigationMenuItem>
    //             )}

    //             {!element.hasSub && (
    //               <NavigationMenuItem>
    //                 <NavigationMenuLink className='text-sm text-primary-foreground hover:text-accent font-medium cursor-default'>
    //                   {element.name}
    //                 </NavigationMenuLink>
    //               </NavigationMenuItem>
    //             )}
    //           </Fragment>
    //         ))}
    //       </NavigationMenuList>
    //     </NavigationMenu>
    //   </div>
    //   <div className='flex items-center space-x-2'>

    //     <Dialog open={open} onOpenChange={setOpen}>
    //       <DialogTrigger asChild>
    //         <Button variant='ghost' size='lg' className='text-primary-foreground hover:text-accent'>
    //           Đăng nhập
    //         </Button>
    //       </DialogTrigger>
    //       <DialogContent showCloseButton={false} className='sm:max-w-xs min-w-3xl'>
    //         <DialogTitle className='sr-only' />
    //         {mode === "login" ? (
    //           <LoginForm
    //             switchtosignup={() => setMode("signup")}
    //             onSuccess={() => setOpen(false)}
    //           />
    //         ) : (
    //           <SignupForm switchtologin={() => setMode("login")} />
    //         )}
    //       </DialogContent>
    //     </Dialog>

    //     <Button
    //       variant='ghost'
    //       size='lg'
    //       className='text-primary-foreground hover:text-accent border-border'
    //     >
    //       Đăng tin
    //     </Button>
    //   </div>
    // </header>

    <header
      className={[
        "sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border transition-shadow duration-300",
        scrolled ? "shadow-md shadow-primary/5" : "shadow-none",
      ].join(" ")}
    >
      <div className='max-w-310 mx-auto px-4 lg:px-8 flex items-center justify-between py-3'>
        {/* Logo */}
        <Link to='/' className='flex items-center gap-2.5 shrink-0'>
          {/* <img src='/logo2.png' alt='Kimdienhomes' className='h-12 w-auto' /> */}
          <LogoMark />
          <div className='flex flex-col leading-tight'>
            <span className="font-['Fraunces',serif] font-semibold text-[19px] text-[#16375E]">
              Kimdienhomes
            </span>
            <span className='text-[9.5px] tracking-[0.09em] uppercase text-[#C69A54] font-semibold'>
              Property &amp; Homes
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className='hidden lg:flex'>
          <NavigationMenuList className='gap-1'>
            {navigationLinks.map((element, index) => (
              <Fragment key={element.id}>
                {element.hasSub ? (
                  <NavigationMenuItem className='mx-1'>
                    <NavigationMenuTrigger
                      className={[
                        "relative pb-1 text-base font-medium text-[#241F19] transition-all duration-300",
                        "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-[#C69A54] after:content-[''] after:transition-transform after:duration-200 hover:bg-transparent hover:text-[#16375E] hover:after:scale-x-100 data-[state=open]:text-[#16375E] data-[state=open]:after:scale-x-100",
                      ].join(" ")}
                    >
                      {element.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className='flex flex-col min-w-64 p-2'>
                      {element.subs.map((item) => (
                        <NavigationMenuLink
                          key={item.pathname}
                          className='px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors'
                        >
                          {item.name}
                        </NavigationMenuLink>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={[
                        "relative px-3 py-2 text-base font-medium text-[#241F19] transition-all duration-300",
                        "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#C69A54] after:content-[''] after:transition-transform after:duration-200 hover:bg-transparent hover:text-[#16375E] hover:after:scale-x-100",
                      ].join(" ")}
                    >
                      {element.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right actions */}
        <div className='flex items-center gap-2'>
          <div className='hidden lg:flex items-center gap-2 text-[13.5px] font-semibold text-[#16375E]'>
            <Phone size={16} className='text-[#C69A54]' />
            0336 739 686
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant='ghost'
                size='lg'
                className='hidden sm:inline-flex text-foreground hover:text-primary hover:bg-accent'
              >
                Đăng nhập
              </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className='sm:max-w-xs min-w-3xl'>
              <DialogTitle className='sr-only' />
              {mode === "login" ? (
                <LoginForm
                  switchtosignup={() => setMode("signup")}
                  onSuccess={() => setOpen(false)}
                />
              ) : (
                <SignupForm switchtologin={() => setMode("login")} />
              )}
            </DialogContent>
          </Dialog>

          <Button
            size='lg'
            className='hidden p-3.5 sm:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0'
          >
            Đăng tin
          </Button>

          {/* Mobile menu toggle */}
          <button
            type='button'
            className='lg:hidden text-primary p-2 -mr-2'
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={[
                "block transition-transform duration-300",
                menuOpen ? "rotate-90" : "rotate-0",
              ].join(" ")}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu — animated height */}
      <div
        className={[
          "lg:hidden grid transition-[grid-template-rows] duration-300 ease-out",
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <nav className='overflow-hidden border-t border-border max-h-[70vh] overflow-y-auto scrollbar-none'>
          {navigationLinks.map((element, i) => (
            <div
              key={element.id}
              style={{ transitionDelay: `${i * 40}ms` }}
              className={[
                "transition-all duration-300",
                menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2",
              ].join(" ")}
            >
              {element.hasSub ? (
                <>
                  <button
                    type='button'
                    className='flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-foreground border-b border-border'
                    onClick={() =>
                      setMobileSubmenuOpen((prev) => (prev === element.id ? null : element.id))
                    }
                  >
                    <span>{element.name}</span>
                    <ChevronDown
                      size={16}
                      className={[
                        "transition-transform duration-200",
                        mobileSubmenuOpen === element.id ? "rotate-180" : "rotate-0",
                      ].join(" ")}
                    />
                  </button>
                  <div
                    className={[
                      "overflow-hidden transition-all duration-300",
                      mobileSubmenuOpen === element.id
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0",
                    ].join(" ")}
                  >
                    {element.subs.map((item) => (
                      <a
                        key={item.pathname}
                        href='#'
                        className='block pl-7 pr-4 py-2.5 text-sm text-muted-foreground hover:text-primary border-b border-border'
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a
                  href='#'
                  className='block px-4 py-3 text-sm font-semibold text-foreground border-b border-border'
                >
                  {element.name}
                </a>
              )}
            </div>
          ))}

          <div className='flex flex-col gap-2 p-auto sm:hidden'>
            <Button
              variant='outline'
              className='w-full border-border text-foreground'
              onClick={() => setOpen(true)}
            >
              Đăng nhập
            </Button>
            <Button className='w-full bg-primary text-primary-foreground hover:bg-primary/90'>
              Đăng tin
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
