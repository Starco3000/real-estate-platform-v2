import { LoginForm } from "@/components/auths/login-form"

const UserSignInPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[url(/jpg/binhduong.jpg)] bg-no-repeat bg-cover p-6 md:p-10">
      <div className="flex w-full max-w-3xl flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  )
}

export default UserSignInPage
