import { FormSingIn } from "../../components/formSingIn/Formulario";
import GoogleLogin from "./GoogleLogin";

const SingIn = () => {
  return (
    <section className="h-[calc(100vh-4.1em)] flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0  border-neutral-800">
      <div className="md:w-1/3 max-w-sm ">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm flex-col gap-4 ">
        <div className="text-5xl font-bold flex flex-col gap-4">
          <h1 className=" text-2xl  md:text-2xl text-center  text-neutral-700">
            Inicia session en tu cuenta Nova Cademy
          </h1>
          <GoogleLogin />
        </div>

  
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Or
          </p>
        </div>
        <FormSingIn />
      </div>
    </section>
  );
};

export default SingIn;
