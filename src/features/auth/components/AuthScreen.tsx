'use client';

import { useState } from 'react';

import { SignInCard } from '@/features/auth/components/SignInCard';
import { SignUpCard } from '@/features/auth/components/SignUpCard';

import { AuthFlow } from '../types';

export const AuthScreen = () => {
  const [state, setState] = useState<AuthFlow>('signIn');
  return (
    <div className="h-full flex-center bg-[#5C3B58]">
      <div className="md:h-auto md:w-105">
        {state === 'signIn' ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
};
