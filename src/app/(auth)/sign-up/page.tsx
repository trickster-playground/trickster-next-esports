import React from "react";
import Link from "next/link";
import Wrapper from "@/components/landing-page/Wrapper";
import Container from "@/components/landing-page/Container";

import { Metadata } from "next";
import { LampContainer } from "@/components/landing-page/Lamp";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUpPage = () => {
  return (
    <main className="h-screen w-full overflow-hidden">
      <Wrapper className="relative flex flex-col items-center justify-center -mt-4">
        <div className="absolute -right-1/3 top-0 z-10 hidden h-72 w-72 rounded-full bg-blue-600 blur-[10rem] md:block"></div>
        <div className="absolute -left-1/3 bottom-0 z-10 hidden h-72 w-72 rounded-full bg-blue-600 blur-[10rem] md:block"></div>
        <Container>
          <LampContainer className="mt-10">
            <div className="relative flex w-full flex-col items-center justify-center text-center">
              <p className="mx-auto max-w-md text-white">
                Sign up to feel the seamless experience publish your e-sports
                tournament with Trickster World&apos;s
              </p>
              <div className="my-10 -mb-28">
                <Card className="w-[350px] border-primary">
                  <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                      Publish your new tournaments in one-click.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SignUpForm />
                  </CardContent>
                </Card>
                <Button variant="white" className="mt-10" asChild>
                  <Link href="/sign-in">
                    Already have an account ? Get started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </LampContainer>
        </Container>
      </Wrapper>
    </main>
  );
};

export default SignUpPage;
