import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Mic, MicOff, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = {
    english: "English",
    hindi: "हिंदी",
    marathi: "मराठी"
  };

  const greetings = {
    english: "Hello! I'm your AI farming assistant. How can I help you today?",
    hindi: "नमस्ते! मैं आपका AI कृषि सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    marathi: "नमस्कार! मी तुमचा AI शेती सहाय्यक आहे. आज मी तुम्हाला कशी मदत करू शकतो?"
  };

  useEffect(() => {
    // Initial greeting
    const greeting: Message = {
      id: '1',
      text: greetings[selectedLanguage as keyof typeof greetings],
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([greeting]);
  }, [selectedLanguage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputText, selectedLanguage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (input: string, language: string) => {
    const responses = {
      english: [
        "Based on your query, I recommend consulting with a veterinarian for the best advice.",
        "For breed-specific information, you can use our Breed Recognition feature. It provides detailed insights about different cattle and buffalo breeds.",
        "Disease symptoms can vary. I suggest using our Disease Prediction tool for more accurate analysis.",
        "Good farming practices include regular health checkups, proper nutrition, and maintaining clean living conditions for your livestock.",
        "The milk yield depends on the breed, nutrition, and care provided. Gir cattle typically produce 12-15 liters per day."
      ],
      hindi: [
        "आपके प्रश्न के आधार पर, मैं सबसे अच्छी सलाह के लिए पशु चिकित्सक से सलाह लेने की सिफारिश करता हूं।",
        "नस्ल-विशिष्ट जानकारी के लिए, आप हमारी नस्ल पहचान सुविधा का उपयोग कर सकते हैं।",
        "रोग के लक्षण अलग-अलग हो सकते हैं। मैं अधिक सटीक विश्लेषण के लिए हमारे रोग भविष्यवाणी उपकरण का उपयोग करने का सुझाव देता हूं।",
        "अच्छी कृषि प्रथाओं में नियमित स्वास्थ्य जांच, उचित पोषण और पशुओं के लिए स्वच्छ रहने की स्थिति बनाए रखना शामिल है।",
        "दूध की उपज नस्ल, पोषण और दी गई देखभाल पर निर्भर करती है। गिर गाय आमतौर पर प्रति दिन 12-15 लीटर दूध देती है।"
      ],
      marathi: [
        "तुमच्या प्रश्नाच्या आधारे, मी सर्वोत्तम सल्ल्यासाठी पशुवैद्यकांचा सल्ला घेण्याची शिफारस करतो.",
        "जाती-विशिष्ट माहितीसाठी, तुम्ही आमचे जाती ओळख वैशिष्ट्य वापरू शकता.",
        "रोगाची लक्षणे वेगवेगळी असू शकतात. अधिक अचूक विश्लेषणासाठी आमचे रोग भविष्यवाणी साधन वापरण्याचा मी सल्ला देतो.",
        "चांगल्या शेतीच्या पद्धतींमध्ये नियमित आरोग्य तपासणी, योग्य पोषण आणि गुरांसाठी स्वच्छ राहण्याची परिस्थिती राखणे समाविष्ट आहे.",
        "दुधाचे उत्पादन जाती, पोषण आणि दिलेल्या काळजीवर अवलंबून असते. गिर गाई सामान्यतः दिवसाला 12-15 लिटर दूध देते."
      ]
    };
    
    const langResponses = responses[language as keyof typeof responses] || responses.english;
    return langResponses[Math.floor(Math.random() * langResponses.length)];
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Simulate voice input
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h1 className="text-4xl font-bold text-primary mb-4">AI Chatbot Assistant</h1>
          <p className="text-xl text-muted-foreground">
            Get instant answers to your farming questions in your preferred language
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Language Selection */}
          <Card className="mb-6 bounce-in">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Select Language:</span>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-40 glow-hover">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(languages).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="mb-6 slide-up">
            <CardContent className="p-0">
              {/* Chatbot Avatar */}
              <div className="p-6 text-center border-b">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  <div className="w-full h-full gradient-wave rounded-full flex items-center justify-center floating">
                    <Bot className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute inset-0 gradient-glow rounded-full opacity-50 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-primary">Farm Assistant AI</h3>
                <p className="text-muted-foreground">Always here to help!</p>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} fade-in-up`}
                  >
                    <div className={`flex items-start gap-3 max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' ? 'bg-primary' : 'gradient-primary'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`p-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-card border glow-hover'
                      }`}>
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start fade-in-up">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="p-3 rounded-lg bg-card border">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Section */}
              <div className="p-6 border-t">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type your farming question here..."
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="pr-12 glow-hover"
                    />
                  </div>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleListening}
                    className={`glow-hover ${isListening ? 'bg-accent text-accent-foreground' : ''}`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  
                  <Button 
                    onClick={sendMessage}
                    disabled={!inputText.trim()}
                    className="gradient-primary glow-primary"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                {isListening && (
                  <div className="mt-3 text-center">
                    <div className="inline-flex items-center gap-2 text-accent animate-pulse">
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                      <span className="text-sm">Listening...</span>
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 fade-in-up">
            <Button
              variant="outline"
              className="h-20 text-left p-4 glow-hover"
              onClick={() => {
                setInputText("What are the symptoms of mastitis in cows?");
                sendMessage();
              }}
            >
              <div>
                <div className="font-medium">Common Diseases</div>
                <div className="text-sm text-muted-foreground">Ask about livestock diseases</div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 text-left p-4 glow-hover"
              onClick={() => {
                setInputText("How can I improve milk production in my cows?");
                sendMessage();
              }}
            >
              <div>
                <div className="font-medium">Milk Production</div>
                <div className="text-sm text-muted-foreground">Tips to increase yield</div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 text-left p-4 glow-hover"
              onClick={() => {
                setInputText("What is the best feed for Gir cattle?");
                sendMessage();
              }}
            >
              <div>
                <div className="font-medium">Nutrition Guide</div>
                <div className="text-sm text-muted-foreground">Feeding recommendations</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;