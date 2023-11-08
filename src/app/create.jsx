import { useRouter } from "./router";
import { useItemMutation } from "./items";

import { Form } from "./form";
import { Button } from "./button";

import { logger } from "../utils/logger";
import { generateId } from "../utils/id";

export function Create() {
  const router = useRouter();
  const { addItem } = useItemMutation();

  return (
    <div className="Create">
      <Form
        formId="create-form"
        handleAction={async function handleCreateAction(toCreate) {
          logger.info(
            "[create]",
            "executing handleCreateAction client action",
            {
              toCreate,
            },
          );

          const item = {
            ...toCreate,
            id: generateId(),
          };

          await new Promise((resolve) => setTimeout(resolve, 500));
          addItem(item);
          router.navigate(`/view/${item.id}`);
        }}
      >
        {({ submitting }) => (
          <Button type="submit" form="create-form" disabled={submitting}>
            Create
          </Button>
        )}
      </Form>
    </div>
  );
}
