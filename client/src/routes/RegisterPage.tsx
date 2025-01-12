import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { useAuthStore } from '../store';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterForm>();
  const navigation = useNavigate();
  const signup = useAuthStore((state) => state.signup);

  const onSubmit: SubmitHandler<RegisterForm> = async (formData) => {
    try {
      await signup(formData);
      navigation('/login', { replace: true });
    } catch (error) {
      toast.error(error as string);
    } finally {
      reset();
    }
  };

  return (
    <div className='flex justify-center items-center h-full'>
      <form
        className='flex flex-col gap-y-4 bg-slate-200 shadow-lg p-8 rounded-lg md:w-96 h-96'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col'>
          <label htmlFor='name'>Name</label>
          <input
            {...register('name', {
              required: 'The name is required',
              minLength: {
                value: 3,
                message: 'The name must be at least 3 characters long',
              },
            })}
            type='text'
            id='name'
            className='mb-1 px-4 py-2 border-none rounded-lg caret-neutral-500 outline-none'
          />
          {errors.name && (
            <span className='text-red-500 text-xs'>{errors.name.message}</span>
          )}
        </div>

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
          {isSubmitting ? 'Loading...' : 'Register'}
        </button>
        <div className='flex justify-center items-center gap-x-3'>
          <p className='text-center'>Already have an account?</p>
          <Link
            to='/login'
            className='text-blue-600 hover:underline'
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};
