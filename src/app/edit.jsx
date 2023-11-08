import { useState } from "react";

import { Button } from "./button";
import { StatusAlert } from "./status-alert";

import { useRouter } from "./router";
import { useItem, useItemMutation } from "./items";

import { Form } from "./form";

import { logger } from "../utils/logger";

export function Edit() {
  const router = useRouter();
  const {
    match: { params },
  } = router;

  const clientItem = useItem(params.id);
  const { updateItem, deleteItem } = useItemMutation();

  const [deleting, setDeleting] = useState(false);

  logger.log(
    "[edit]",
    "rendering Edit client component",
    { params },
    { clientItem },
  );

  if (!clientItem) {
    return <StatusAlert>Note not found.</StatusAlert>;
  }

  return (
    <div className="Edit">
      <Form
        item={clientItem}
        formId="edit-form"
        handleAction={async function handleEditAction(updated) {
          logger.info("[edit]", "executing handleEditAction client action", {
            updated,
          });
          await new Promise((resolve) => setTimeout(resolve, 500));
          updateItem(updated);
          router.navigate(`/view/${updated.id}`);
        }}
      >
        {({ submitting }) => (
          <div className="Edit-actions">
            <Button
              type="submit"
              form="edit-form"
              disabled={submitting || deleting}
            >
              Update
            </Button>
            <Button
              type="submit"
              form="edit-form"
              formAction={async function handleDeleteAction(formData) {
                logger.info(
                  "[edit]",
                  "executing handleDeleteAction client action",
                  { formData },
                );
                setDeleting(true);
                const deleteId = formData.get("id");
                await new Promise((resolve) => setTimeout(resolve, 500));
                deleteItem(deleteId);
                setDeleting(false);
                router.navigate("/");
              }}
              className="Edit-delete-button"
              disabled={submitting || deleting}
            >
              Delete
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}
