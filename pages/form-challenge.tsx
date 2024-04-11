import { FieldErrors, useForm } from "react-hook-form";

interface IForm {
	name: string;
	email: string;
	password: string;
}

export default function FormChallenge() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<IForm>({
		mode: "onChange",
	});
	const onValid = (data: IForm) => {
		console.log("you've got registered! :^)");
	};
	const onInvalid = (errors: FieldErrors) => {
		console.log(errors);
	};

	return (
		<div className="container">
			<form onSubmit={handleSubmit(onValid, onInvalid)} className="form-container">
				<div className="input-wrap">
					<label>Name</label>
					<input
						{...register("name", {
							required: "Put your name please in English or Korean",
							minLength: {
								value: 2,
								message: "User name must be longer than 2 characters",
							},
							pattern: {
								value: /[ㄱ-ㅎ가-핳a-zA-Z]$/,
								message: "You can use only Roman Alphabet or Hangeul",
							},
						})}
						type="text"
						placeholder="Put your name down "
					/>
					{errors.name && <span className="error-message">{errors.name?.message}</span>}
				</div>
				<div className="input-wrap">
					<label>Email</label>
					<input
						{...register("email", {
							required: "You should put your email with @naver.com",
							validate: {
								onlyNaver: value => value.includes("@naver.com") || "Only Naver mail address is allowed",
							},
						})}
						type="email"
						placeholder="Only @naver.com"
					/>
					{errors.email && <span className="error-message">{errors.email?.message}</span>}
				</div>
				<div className="input-wrap">
					<label>Password</label>
					<input
						{...register("password", {
							required: "You should put password",
							minLength: {
								value: 10,
								message: "Password should be longer 10 characters",
							},
						})}
						type="password"
						placeholder="Min 10 characters"
					/>
					　{errors.password && <span className="error-message">{errors.password?.message}</span>}
				</div>
				<div className="button-wrap">
					<input type="submit" value="Log In" />
					<input onClick={() => reset()} type="reset" placeholder="Reset" />
				</div>
				<div className="message-wrap">
					{isSubmitSuccessful && <span className="success-message">YAY! Welcome back!</span>}
					{errors.errors && <span className="error-message">{errors.errors?.message}</span>}
				</div>
			</form>
		</div>
	);
}
