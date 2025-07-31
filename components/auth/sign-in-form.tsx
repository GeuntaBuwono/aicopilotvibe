"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInAction } from "@/lib/auth-actions"
import { formSchemas } from "@/lib/validation-utils"

type SignInFormData = z.infer<typeof formSchemas.signIn>

export function SignInForm() {
  const { execute, isPending, result } = useAction(signInAction)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(formSchemas.signIn),
  })

  const onSubmit = (data: SignInFormData) => {
    execute(data)
  }

  const errorMessage = result?.serverError

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {errorMessage && (
        <BlurFade delay={0.3}>
          <div className="text-sm text-red-700">{errorMessage}</div>
        </BlurFade>
      )}

      <BlurFade delay={0.4}>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            className="transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
            {...register("email")}
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
      </BlurFade>

      <BlurFade delay={0.5}>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            className="transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
            {...register("password")}
          />
          {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
        </div>
      </BlurFade>

      <BlurFade delay={0.6}>
        <button
          type="submit"
          disabled={isPending}
          className="relative w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-blue-600 hover:to-purple-600 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          <span className="relative z-10">{isPending ? "Signing in..." : "Sign In"}</span>
          {!isPending && (
            <div className="absolute inset-0 animate-pulse rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-500" />
          )}
        </button>
      </BlurFade>
    </form>
  )
}
