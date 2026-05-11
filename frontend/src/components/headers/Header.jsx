import React, { Fragment, useState } from 'react';
import { Link } from 'react-router';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import { navigationLinks } from '@/lib/constants';
import { Button } from '../ui/button';
import { HeartIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { LoginForm } from '../auths/login-form';
import { SignupForm } from '../auths/signup-form';

const Header = () => {
  const [mode, setMode] = useState('login');
  const [open, setOpen] = useState(false);
  return (
    <div className='flex items-center max-w-screen h-24 p-4 bg-primary shadow-sm'>
      <div className='flex items-center gap-x-4 flex-1'>
        <Link to='/'>
          <img src='/logo2.png' alt='Kimdienhomes' className='h-14 w-auto' />
        </Link>
        <NavigationMenu className='space-x-4'>
          <NavigationMenuList>
            {navigationLinks.map((element) => (
              <Fragment key={element.id}>
                {element.hasSub && (
                  <NavigationMenuItem className='mx-1'>
                    <NavigationMenuTrigger className='text-primary-foreground hover:text-accent'>
                      {element.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className='flex flex-col min-w-80'>
                      {element.subs.map((item) => (
                        <NavigationMenuLink
                          key={item.pathname}
                          className='px-4 font-medium rounded-md hover:bg-accent cursor-pointer'
                        >
                          {item.name}
                        </NavigationMenuLink>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}

                {!element.hasSub && (
                  <NavigationMenuItem>
                    <NavigationMenuLink className='text-sm text-primary-foreground hover:text-accent font-medium cursor-default'>
                      {element.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className='flex items-center space-x-2'>
        {/* Bài yêu thích */}
        {/* <Button
          variant='ghost'
          size='icon-lg'
          className='text-primary-foreground hover:text-accent'
        >
          <HeartIcon className='size-6' />
        </Button> */}
        {/* Đăng Nhập */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant='ghost' size='lg' className='text-primary-foreground hover:text-accent'>
              Đăng nhập
            </Button>
          </DialogTrigger>
          <DialogContent showCloseButton={false} className='sm:max-w-xs min-w-3xl'>
            <DialogTitle className='sr-only' />
            {mode === 'login' ? (
              <LoginForm switchtosignup={() => setMode('signup')} onSuccess={() => setOpen(false)}/>
            ) : (
              <SignupForm switchtologin={() => setMode('login')} />
            )}
          </DialogContent>
        </Dialog>

        <Button
          variant='ghost'
          size='lg'
          className='text-primary-foreground hover:text-accent border-border'
        >
          Đăng tin
        </Button>
      </div>
    </div>
  );
};

export default Header;
