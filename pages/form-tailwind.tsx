import { FieldErrors, useForm } from "react-hook-form";

const Department = ["Sales", "Marketing", "Accounting", "Customer Service"];
const JoinReasons = ["I want Money", "I love this company", "I want to learn", "I don't know why"];
const Salaries = ["$50K", "$100K", "$150K", "$200K"];

interface IForm {
	department: string;
	joinReason: string;
	salary: string;
	introduction: string;
	dream: string;
	email: string;
}

export default function FormDecoration() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
	} = useForm<IForm>({
		mode: "onSubmit",
	});
	const onValid = (data: IForm) => {
		console.log("yay!");
	};

	const onInvalid = (errors: FieldErrors) => {
		console.log(errors);
	};
	return (
		<div className="screen-container">
			<form className="form-container" onSubmit={handleSubmit(onValid, onInvalid)}>
				<h1 className="abril">
					<span className="block text-sm opacity-85">Hi,We've been looking for you!</span>
					Tell us about yourself
				</h1>
				<div className="input-wrap">
					<h2>What department do you want to work for?</h2>
					{Department.map((option, index) => (
						<label key={index}>
							<input
								{...register("department", {
									required: "please choose the department you want to join",
								})}
								type="radio"
								name="department"
								value={option}
								defaultChecked={index === 0 ? true : false}
								className="peer"
							/>
							<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="opacity-0 peer-checked:opacity-100 transition-opacity">
								<path d="M22.319,4.431,8.5,18.249a1,1,0,0,1-1.417,0L1.739,12.9a1,1,0,0,0-1.417,0h0a1,1,0,0,0,0,1.417l5.346,5.345a3.008,3.008,0,0,0,4.25,0L23.736,5.847a1,1,0,0,0,0-1.416h0A1,1,0,0,0,22.319,4.431Z" />
							</svg>
							{option}
						</label>
					))}
					{errors.department && <p className="error-message">{errors?.department.message}</p>}
				</div>
				<div className="input-wrap">
					<h2>Why do you want to join this company?</h2>
					{JoinReasons.map((joinReason, index) => (
						<label key={index}>
							<input
								{...register("joinReason", {
									required: "please choose the reason why you want to join our company",
								})}
								type="radio"
								name="join-reason"
								value={joinReason}
								defaultChecked={index === 0 ? true : false}
								className="peer"
							/>
							<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="opacity-0 peer-checked:opacity-100 transition-opacity">
								<path d="M22.319,4.431,8.5,18.249a1,1,0,0,1-1.417,0L1.739,12.9a1,1,0,0,0-1.417,0h0a1,1,0,0,0,0,1.417l5.346,5.345a3.008,3.008,0,0,0,4.25,0L23.736,5.847a1,1,0,0,0,0-1.416h0A1,1,0,0,0,22.319,4.431Z" />
							</svg>
							{joinReason}
						</label>
					))}
					{errors.joinReason && <p className="error-message">{errors.joinReason?.message}</p>}
				</div>
				<div className="input-wrap">
					<h2>Salary</h2>
					<select {...register("salary", { required: "please choose the salary amount you want" })}>
						{Salaries.map((salary, index) => (
							<option key={index} value={salary}>
								{salary}
							</option>
						))}
					</select>
					{errors.salary && <p className="error-message">{errors.salary?.message}</p>}
				</div>
				<div className="input-wrap">
					<h2>Introduce yourself</h2>
					<textarea
						{...register("introduction", {
							required: "Please write down your introduction in short",
						})}
						className="h-6"
					/>
					{errors.introduction && <p className="error-message">{errors.introduction?.message}</p>}
				</div>
				<div className="input-wrap">
					<h2>Tell us what your dreams are</h2>
					<textarea
						{...register("dream", {
							required: "Tell us what your dreams are in more than 10 characters",
							minLength: {
								value: 10,
								message: "Your dream contents should contain more than 10 characters.",
							},
						})}
					/>
					{errors.dream && <p className="error-message">{errors.dream?.message}</p>}
				</div>
				<div className="input-wrap">
					<h2>Email</h2>
					<input
						{...register("email", {
							required: "Email is required",
							validate: {
								onlyNaver: value => value.endsWith("@naver.com") || "Only @naver.com is allowed",
							},
						})}
						type="email"
					/>
					{errors.email && <p className="error-message">{errors.email?.message}</p>}
				</div>
				<div className="input-wrap">
					<input type="submit" value="Give me this job" />
				</div>
				{isSubmitSuccessful && (
					<p className="success-message cursive">
						Your application is submitted successfully!
						<br /> Please wait for our response email. <br /> Thank you for your application :)
					</p>
				)}
			</form>
		</div>
	);
}
