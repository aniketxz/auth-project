import authBg from "../assets/image.png"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen'>
      <div className='absolute top-6 left-6 flex items-center gap-2'>
        <img src={"/logo.png"} alt='logo' className='size-8' />
        <span className='text-primary text-2xl font-semibold'>HD</span>
      </div>

      <div className='w-2/5 flex items-center'>
        <div className='w-full'>{children}</div>
      </div>

      <div className='w-3/5 p-2'>
				{/* <div className='bg-blue-500 rounded-3xl w-full h-full'></div> */}
				<img src={authBg} alt='auth-bg' className='w-full h-full rounded-3xl object-cover' />
      </div>
    </div>
  )
}

export default AuthLayout
