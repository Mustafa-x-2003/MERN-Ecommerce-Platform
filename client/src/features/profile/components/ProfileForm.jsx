import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { memo } from "react";

 function ProfileForm({
  fields,
  formData,
  setFormData,
  onSubmit,
  buttonText = "Save",
  id,
}) {
  return (
    <div>
      <Card>
        <CardContent>
          <form className="flex flex-col gap-4">
            {fields.map((field) => (
              <div key={field.name}>
                <Label className="text-sm">{field.label}</Label>

                <Input
                  type={field.type}
                  value={formData[field.name]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [field.name]: e.target.value,
                    })
                  }
                />
              </div>
            ))}

            <Button
              onClick={() => {
                console.log(formData, "formdata");

                onSubmit(id, formData);
              }}
            >
              {buttonText}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
export default memo(ProfileForm);