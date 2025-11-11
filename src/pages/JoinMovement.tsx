import * as React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";

type FormValues = {
  name: string;
  email: string;
  involvement: string;
  story: string;
  subscribe: boolean;
};

const JoinMovement: React.FC = () => {
  const { register, handleSubmit, reset, formState, control } = useForm<FormValues>({
    defaultValues: { involvement: "Heritage Supporter", subscribe: true },
  });

  const onSubmit = (data: FormValues) => {
    console.log("submit", data);
    toast("Thank you for joining the heritage movement!");
    reset();
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-serif font-bold mb-4">Join the Movement</h1>
          <p className="text-muted-foreground mb-6">Support artisans, sponsor projects or volunteer in workshops.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl bg-card p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input {...register("name", { required: true })} />
              </div>

              <div>
                <Label>Email</Label>
                <Input type="email" {...register("email", { required: true })} />
              </div>

              <div>
                <Label>Involvement</Label>
                <div className="flex gap-2 mt-2">
                  <Controller
                    name="involvement"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field} value={field.value}>
                        <div className="flex gap-2">
                          <label className="flex items-center gap-2"><RadioGroupItem value="Heritage Supporter" /> Heritage Supporter</label>
                          <label className="flex items-center gap-2"><RadioGroupItem value="Sponsorship Opportunity" /> Sponsorship</label>
                          <label className="flex items-center gap-2"><RadioGroupItem value="Volunteer" /> Volunteer</label>
                          <label className="flex items-center gap-2"><RadioGroupItem value="Partnership" /> Partnership</label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                </div>
              </div>

              <div>
                <Label>Tell us your story</Label>
                <Textarea rows={6} {...register("story", { required: true })} />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox {...register("subscribe")} defaultChecked />
                <Label>Subscribe to our newsletter</Label>
              </div>

              <div>
                <Button type="submit">Submit Application</Button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JoinMovement;
