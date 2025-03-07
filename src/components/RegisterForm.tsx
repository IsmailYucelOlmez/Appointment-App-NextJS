import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoogleSignIn } from "./google-sign-in"
import { AppleSignIn } from "./apple-sign-in"
import { signUp } from "@/actions/actions"
import { redirect } from "next/navigation"

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>
            Register with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <AppleSignIn />
                <GoogleSignIn />
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <form action={async (formData) => {
              "use server";
              const res = await signUp(formData);
              console.log(res)
                if (res.success) {
                redirect("/sign-in");
              }
            }}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username">Ad Soyad</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="İsim Soyisim"
                    required
                />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                />
                </div>
                <div className="grid gap-2">          
                  <Label htmlFor="password">Password</Label>        
                  <Input id="password" type="password" required />
                </div>
                <Button className="w-full">
                  Sign Up
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/sign-in" className="underline underline-offset-4">
                  Sign In
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
