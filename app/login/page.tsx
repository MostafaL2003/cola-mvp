import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* Left Section: Brand Background Color (#F40009) with BIG Platform SVG */}
      <div className="w-full lg:w-[68%] bg-[#F40009] flex flex-col items-center justify-center p-8 lg:p-16 relative overflow-hidden min-h-[420px] lg:min-h-screen">
        {/* Subtle radial ambient highlight for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/15 pointer-events-none" />

        <div className="relative z-10 w-full max-w-4xl flex items-center justify-center p-4">
          <Image
            src="/platform.svg"
            alt="Coca-Cola MES Platform"
            width={950}
            height={950}
            className="w-full max-w-[850px] h-auto object-contain drop-shadow-2xl transform lg:scale-110 transition-transform"
            priority
          />
        </div>
      </div>

      {/* Right Section: Compact (50% smaller) with Pure White Background */}
      <div className="w-full lg:w-[32%] flex flex-col items-center justify-center p-8 lg:p-12 bg-white min-h-[500px]">
        <div className="w-full max-w-xs flex flex-col items-center">
          {/* Header: "MES" word on the left of the Logo */}
          <div className="flex items-center gap-3 mb-10">
            <span className="text-3xl font-extrabold tracking-wider text-slate-900 font-montserrat uppercase">
              MES
            </span>
            <Image
              src="/factoryIcon-red.svg"
              alt="MES Factory Logo"
              width={36}
              height={27}
              className="w-8 h-6 object-contain"
              priority
            />
          </div>

          {/* Interactive Login Form (Client Component) */}
          <LoginForm />

          {/* Coca-Cola Logo in Brand Color (#F40009) below the form */}
          <div className="mt-12 flex flex-col items-center">
            <Image
              src="/coca-cola-red.svg"
              alt="Coca-Cola"
              width={160}
              height={70}
              className="w-36 h-auto object-contain hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
