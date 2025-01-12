import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { useAuthStore } from '../store';

interface LoginForm {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginForm>();
  const login = useAuthStore((state) => state.login);

  const onSubmit: SubmitHandler<LoginForm> = async (formData) => {
    await login(formData);
    reset();
  };

  return (
    <div className='flex justify-center items-center h-full'>
      <form
        className='flex flex-col gap-y-4 bg-slate-200 shadow-lg p-8 rounded-lg md:w-96 h-96'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col'>
          <label htmlFor='email'>Email</label>
          <input
            {...register('email', {
              required: 'The email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'The email is not valid',
              },
            })}
            type='email'
            id='email'
            className='mb-1 px-4 py-2 border-none rounded-lg caret-neutral-500 outline-none'
          />
          {errors.email && (
            <span className='text-red-500 text-xs'>{errors.email.message}</span>
          )}
        </div>

        <div className='flex flex-col'>
          <label htmlFor='password'>Password</label>
          <input
            {...register('password', {
              required: 'The password is required',
              minLength: {
                value: 6,
                message: 'The password must be at least 6 characters long',
              },
            })}
            type='password'
            id='password'
            className='mb-1 px-4 py-2 border-none rounded-lg caret-neutral-500 outline-none'
          />
          {errors.password && (
            <span className='text-red-500 text-xs'>
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          disabled={!isValid || isSubmitting}
          className='bg-blue-600 hover:bg-blue-800 disabled:opacity-50 px-4 py-1.5 rounded-lg text-white disabled:pointer-events-none self-end'
          type='submit'
        >
          {isSubmitting ? 'Loading...' : 'Login'}
        </button>
        <div className='flex justify-center items-center gap-x-3'>
          <p className='text-center'>Already have an account?</p>
          <Link
            to='/register'
            className='text-blue-600 hover:underline'
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};
