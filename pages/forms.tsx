import { FieldErrors, useForm } from "react-hook-form";

/*
    Less code
    Better validation
    Better Errors (set, clear, display)
    Have control over inputs
    Dont deal with events
    Eaiser Inputs

    onBlur when you click outside of input
    onChange 

    watch allows you to watch "ONLY ONE FIELD"
*/

interface IForm {
	username: string;
	email: string;
	password: string;
	errors?: string;
}

export default function Forms() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		setError,
		reset,
		resetField,
	} = useForm<IForm>({
		mode: "onChange",
	});
	const onValid = (data: IForm) => {
		console.log("im valid");
		// setError("username", { message: "already taken username" });
		resetField("password");
	};
	const onInvalid = (errors: FieldErrors) => {
		console.log(errors);
	};

	return (
		<form onSubmit={handleSubmit(onValid, onInvalid)}>
			<input
				{...register("username", {
					required: "Username is required",
					minLength: {
						value: 5,
						message: "The username should be longer than 5 chars",
					},
				})}
				type="text"
				placeholder="Username"
			/>
			{errors.username?.message}
			<input
				{...register("email", {
					required: "Email is required",
					validate: {
						notGmail: value => !value.includes("@gmail.com") || "Gmail is not allowed",
					},
				})}
				type="email"
				placeholder="Write Email"
				className={`${Boolean(errors.email) ? "border-red-500 border" : ""}`}
			/>
			{errors.email?.message}
			<input {...register("password", { required: "Password is required" })} type="password" placeholder="Password" />
			<input type="submit" value="Create Account" />
			{errors.errors?.message}
		</form>
	);
}
