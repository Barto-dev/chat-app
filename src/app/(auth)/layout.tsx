import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="h-full flex-center bg-[#5C3B58]">
      <div className="md:h-auto md:w-105">{children}</div>
    </div>
  );
};

export default AuthLayout;
