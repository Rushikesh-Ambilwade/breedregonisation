import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileImage, AlertTriangle, Heart, Pill } from "lucide-react";

const DiseasePrediction = () => {
  const [formData, setFormData] = useState({
    animalType: "",
    animalName: "",
    breed: "",
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleFileUpload = (files: FileList | null) => {
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  };

  const analyzeDisease = async () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setResults({
        diseaseName: "Mastitis",
        confidence: 87.3,
        severity: "Moderate",
        symptoms: [
          "Swollen udder",
          "Abnormal milk color",
          "Reduced milk production",
          "Heat in affected quarter"
        ],
        remedies: [
          "Immediate antibiotic treatment",
          "Frequent milking of affected quarter",
          "Apply cold compress to reduce swelling",
          "Consult veterinarian for proper medication"
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h1 className="text-4xl font-bold text-primary mb-4">Disease Prediction</h1>
          <p className="text-xl text-muted-foreground">
            Early detection of diseases through AI-powered image analysis
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Input Form */}
          <Card className="mb-8 bounce-in">
            <CardHeader>
              <CardTitle>Animal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Animal Type */}
                <div className="space-y-2">
                  <Label htmlFor="animalType">Animal Type</Label>
                  <Select value={formData.animalType} onValueChange={(value) => setFormData({...formData, animalType: value})}>
                    <SelectTrigger className="glow-hover">
                      <SelectValue placeholder="Select animal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cattle">Cattle</SelectItem>
                      <SelectItem value="buffalo">Buffalo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Animal Name */}
                <div className="space-y-2">
                  <Label htmlFor="animalName">Animal Name</Label>
                  <Input
                    id="animalName"
                    placeholder="Enter animal name"
                    value={formData.animalName}
                    onChange={(e) => setFormData({...formData, animalName: e.target.value})}
                    className="glow-hover"
                  />
                </div>

                {/* Breed */}
                <div className="space-y-2">
                  <Label htmlFor="breed">Breed</Label>
                  <Select value={formData.breed} onValueChange={(value) => setFormData({...formData, breed: value})}>
                    <SelectTrigger className="glow-hover">
                      <SelectValue placeholder="Select or enter breed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gir">Gir</SelectItem>
                      <SelectItem value="jersey">Jersey</SelectItem>
                      <SelectItem value="holstein">Holstein</SelectItem>
                      <SelectItem value="murrah">Murrah Buffalo</SelectItem>
                      <SelectItem value="nili">Nili-Ravi Buffalo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload Section */}
          <Card className="mb-8 slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-6 h-6 text-primary" />
                Upload Image or Video
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer glow-hover">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="media-upload"
                />
                <label htmlFor="media-upload" className="cursor-pointer">
                  <div className="w-20 h-20 gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileImage className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-primary font-medium text-lg">Click to upload image or video</p>
                  <p className="text-muted-foreground mt-2">
                    Clear images of affected areas help improve accuracy
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    JPG, PNG, MP4, MOV (Max 50MB)
                  </p>
                </label>
              </div>

              {/* Uploaded File Preview */}
              {uploadedFile && (
                <div className="mt-6 fade-in-up">
                  <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                        <FileImage className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Analyze Button */}
              {uploadedFile && formData.animalType && formData.animalName && (
                <div className="mt-8 text-center">
                  <Button 
                    size="lg" 
                    onClick={analyzeDisease}
                    disabled={isAnalyzing}
                    className="gradient-hero glow-accent px-8 py-4"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Analyzing Disease...
                      </>
                    ) : (
                      "Predict Disease"
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          {results && (
            <Card className="bounce-in">
              <CardHeader>
                <CardTitle className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <AlertTriangle className="w-8 h-8 text-accent" />
                    <div className="text-3xl font-bold text-primary gradient-hero bg-clip-text text-transparent">
                      {results.diseaseName}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-6 text-lg text-muted-foreground">
                    <span>Confidence: {results.confidence}%</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      results.severity === 'Moderate' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'
                    }`}>
                      Severity: {results.severity}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Symptoms */}
                  <Card className="p-6 slide-up">
                    <div className="flex items-center gap-3 mb-4">
                      <Heart className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold">Observed Symptoms</h3>
                    </div>
                    <ul className="space-y-3">
                      {results.symptoms.map((symptom: string, index: number) => (
                        <li key={index} className="flex items-center gap-3 fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {/* Remedies */}
                  <Card className="p-6 slide-up">
                    <div className="flex items-center gap-3 mb-4">
                      <Pill className="w-6 h-6 text-accent" />
                      <h3 className="text-xl font-semibold">Recommended Remedies</h3>
                    </div>
                    <ul className="space-y-3">
                      {results.remedies.map((remedy: string, index: number) => (
                        <li key={index} className="flex items-start gap-3 fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                          <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-accent font-bold text-sm">{index + 1}</span>
                          </div>
                          <span>{remedy}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                {/* Warning Note */}
                <div className="mt-8 p-6 bg-accent/10 border border-accent/20 rounded-lg fade-in-up">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-accent mb-2">Important Note</h4>
                      <p className="text-muted-foreground">
                        This is an AI-based prediction and should not replace professional veterinary diagnosis. 
                        Please consult with a qualified veterinarian for proper treatment and medication.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseasePrediction;