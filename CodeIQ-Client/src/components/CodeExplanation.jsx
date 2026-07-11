import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CodeExplanation = ({ explanation }) => {
    return (
        <div className="explanation">
            <h2>Explanation:</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{explanation}</ReactMarkdown>
        </div>
    );
};
export default CodeExplanation;
