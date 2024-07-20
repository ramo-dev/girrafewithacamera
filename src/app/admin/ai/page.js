"use client"

import { useState, useEffect, useRef } from 'react';
import { CornerDownLeft, Loader2,Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import './Chatstyles.css';

// Mock function to simulate AI response
async function getAiResponse(myText = 'hello') {
  try {
    // Replace with your actual API endpoint
    const resp = await fetch('/api/giraffe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: myText }),
    });
    const data = await resp.json();
    if (data.girrafeAi) {
      return data.girrafeAi;
    } else {
      console.error('Unexpected response structure:', data);
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Function to format AI response
function formatResponse(response) {
  // Replace \n with <br> for new lines
  let formatted = response.replace(/\n/g, '<br>');

  // Capitalize words between double asterisks and replace with <b>
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, (_, p1) => {
    return `<b>${p1.toUpperCase()}</b>`;
  });

  return formatted;
}

export default function Component() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageInput = e.target.elements.message.value.trim();
    if (messageInput === '') return;

    // Add user message to messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: messageInput, type: 'user' },
    ]);
    e.target.elements.message.value = "";
    
    // Set loading state
    setIsLoading(true);

    // Get AI response
    const aiResponse = await getAiResponse(messageInput);

    // Clear loading state
    setIsLoading(false);

    if (aiResponse) {
      // Format AI response
      const formattedResponse = formatResponse(aiResponse);

      // Add AI response to messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: formattedResponse, type: 'ai' },
      ]);
    }

    // Clear input field
    e.target.elements.message.value = '';
  };

  return (
    <div className="flex flex-col gap-3 h-full h-[80vh]">
      <Card className="relative flex-1 p-4 overflow-y-auto h-[50vh] no-scrollbar bg-background">
        {messages.length == 0 && <span className="bg-gray-400/20 rounded-full p-3 m-auto absolute top-1/2 left-1/2 -translate-x-1/2 w-max">Enter prompt to talk to Girrafe Ai</span>}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === 'ai' ? 'justify-start' : 'justify-end'
            } mb-2`}
          >
            <div
              className={`message-bubble p-3 rounded-lg ${
                message.type === 'ai' ? 'ai-response bg-transparent' : 'my-response bg-gray-400/40'
              }`}
              // Use dangerouslySetInnerHTML to render sanitized HTML
              dangerouslySetInnerHTML={{ __html: message.text }}
            />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </Card>
      <form
        onSubmit={handleSubmit}
        className="pt-2 mt-auto relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
      >
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <div className="flex items-center pt-0 gap-3 px-2 py-2">
          <Input
            required
            id="message"
            name="message"
            placeholder="Type your message here..."
            className="resize-none border-0 shadow-none focus-visible:ring-0 flex-grow ps-1"
          />
          <Button
            type="submit"
            size="sm"
            className="ml-auto gap-1.5 min-w-10 h-10"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? <Loader2 className="text-2xl animate-spin" /> : <Send />}
          </Button>
        </div>
      </form>
    </div>
  );
}

