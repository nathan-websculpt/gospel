import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is Lorem Ipsum?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      question: "Why do we use it?",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    },
    {
      question: "Where does it come from?",
      answer:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
    },
  ];

  return (
    <div className="max-w-md mx-auto bg-slate-300">
      {faqItems.map((item, index) => (
        <div key={index} className="mt-4">
          <button
            className={`flex justify-between w-full px-4 py-2 text-lg font-medium text-left text-gray-900 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ${
              expandedIndex === index ? "bg-gray-100" : ""
            }`}
            onClick={() => handleClick(index)}
            aria-controls={`faq-${index}`}
            aria-expanded={expandedIndex === index}
          >
            {item.question}
            <span className="ml-auto">{expandedIndex === index ? "-" : "+"}</span>
          </button>
          <div className={`mt-2 ${expandedIndex === index ? "block" : "hidden"}`} id={`faq-${index}`}>
            <p className="text-gray-500">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
