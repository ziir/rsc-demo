import { useState } from "react";

import { Link } from "./link";
import { Button } from "./button";

export function Form({
  formId,
  handleAction,

  children: renderAdjacent = null,

  item = null,
}) {
  const { id = null, title = "", content = "" } = item ?? {};
  const [submitting, setSubmitting] = useState(false);

  return (
    <>
      <form
        id={formId}
        role="form"
        className="Form"
        action={async function handleFormAction(formData) {
          const item = {};
          for (let [key, value] of formData) {
            item[key] = value;
          }
          setSubmitting(true);
          await handleAction(item);
          setSubmitting(false);
        }}
      >
        <fieldset className="Form-fieldset">
          {id && <input type="hidden" name="id" value={id} />}
          <label className="Form-label" htmlFor="title-input">
            Title
          </label>
          <input
            required
            autoFocus
            type="text"
            name="title"
            id="title-input"
            disabled={submitting}
            className="Form-input"
            placeholder="Enter title here..."
            defaultValue={title}
          />
        </fieldset>
        <fieldset className="Form-fieldset">
          <label className="Form-label" htmlFor="content-input">
            Content
          </label>
          <textarea
            id="content-input"
            name="content"
            rows="10"
            placeholder="Enter markdown content here..."
            className="Form-input Form-textarea"
            disabled={submitting}
            defaultValue={content}
          ></textarea>
        </fieldset>
      </form>
      <div className="Form-actions">
        <Button
          as={Link}
          disabled={submitting}
          className="Form-cancel-link"
          to={id ? `/view/${id}` : "/"}
        >
          Cancel
        </Button>
        {typeof renderAdjacent === "function" && renderAdjacent({ submitting })}
      </div>
    </>
  );
}
