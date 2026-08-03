import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileForm({
  title,
  fields,
  formData,
  setFormData,
  onSubmit,
  buttonText = "Save",
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

            <Button onClick={onSubmit} type="submit">
              {buttonText}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
