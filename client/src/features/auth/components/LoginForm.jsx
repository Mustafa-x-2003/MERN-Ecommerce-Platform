import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

export default function LoginForm({ className, onSubmit, form, setForm }) {
  return (
    <div className={cn("flex flex-col gap-6 ", className)}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>

                <Input
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                  }}
                  id="email"
                  type="email"
                  placeholder="m.sami.office@gmail.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                  }}
                  id="password"
                  type="password"
                  required
                />
              </Field>
              <Field>
                <Button onClick={onSubmit} className="w-full" type="submit">
                  Login
                </Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link to={"/register"}>Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
