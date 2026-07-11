import { useActionState } from "react";
import { explain } from "../actions";
import CodeExplanation from "./CodeExplanation";

const CodeExplainForm = () => {
    const [formState, formAction, isPending] = useActionState(explain, null);
    return <div className="explain-container">
        <form action={formAction}>
            <label className="form-label">Language : </label>
            <select name="language" className="form-select">
                <option value="javascript">Javascript</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
            </select>
            <textarea
                name="code"
                required
                placeholder="Write Your Code Here..."
                className="code-input"></textarea>
            <button type="submit"
                disabled={isPending}
                className="explain-btn">
                {isPending ? "Explaining..." : "Explain Code"}
            </button>
        </form>
        {
            isPending ? (
                <p className="thinking-text">Thinking...</p>
            ) : formState?.success ? (
                <CodeExplanation explanation={formState?.data.explanation} />
            ) : null
        }
    </div>
}
export default CodeExplainForm;
