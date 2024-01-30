import Image from "next/image";
import Logo from "@/../../public/images/logo.png";
import InputSandi from "@/components/input/InputSandi";
import ButtonLogin from "@/components/button/ButtonLogin";
import InputNama from "@/components/input/InputNama";
import Head from "next/head";

const Login = () => {
  return (
    <div>

      <Head>
        <title>Halaman Masuk</title>
      </Head>
      <div className="flex items-center justify-center h-screen bg-slate-100 text-black">
        <form className="w-full max-w-screen-xl mx-auto">
          <div className="bg-white w-full md:w-[500px] xl:w-[900px] rounded-lg xl:h-[600px] shadow-lg h-[auto] p-8 mx-auto flex flex-col justify-center items-center">
            <div className="mb-8">
              <Image
                src={Logo}
                className="w-full md:w-52 sm:w-40"
                alt="Logo"
                priority
              />
            </div>
            <div className='w-[80%] mt-10'>
              <div className='mb-5'> 
                <InputNama />
              </div>
              <div className='mb-16'> 
                <InputSandi />
              </div>
              <div> 
                <ButtonLogin />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
