import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Image, Video, Eye, Info } from "lucide-react";

const BreedRecognition = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const analyzeBreed = async () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setResults({
        breedName: "Gir Cattle",
        hybridization: [
          { breed: "Gir", percentage: 80 },
          { breed: "Jersey", percentage: 20 }
        ],
        confidence: 94.5
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h1 className="text-4xl font-bold text-primary mb-4">Breed Recognition</h1>
          <p className="text-xl text-muted-foreground">
            Upload images or videos to identify your cattle or buffalo breed with AI precision
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Upload Section */}
          <Card className="mb-8 bounce-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-6 h-6 text-primary" />
                Upload Media Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Image className="w-5 h-5 text-accent" />
                    Images (4-5 photos)
                  </h3>
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer glow-hover">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Image className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-primary font-medium">Click to upload images</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        JPG, PNG, or WEBP (Max 10MB each)
                      </p>
                    </label>
                  </div>
                </div>

                {/* Video Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Video className="w-5 h-5 text-accent" />
                    Video (5-10 seconds)
                  </h3>
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer glow-hover">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <div className="w-16 h-16 gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                        <Video className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-primary font-medium">Click to upload video</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        MP4, MOV, or AVI (Max 50MB)
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              {/* Uploaded Files Preview */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 slide-up">
                  <h4 className="text-lg font-semibold mb-4">Uploaded Files ({uploadedFiles.length})</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-card rounded-lg flex items-center justify-center border rotate-glow">
                          {file.type.startsWith('image/') ? (
                            <Image className="w-8 h-8 text-primary" />
                          ) : (
                            <Video className="w-8 h-8 text-primary" />
                          )}
                        </div>
                        <p className="text-xs text-center mt-2 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analyze Button */}
              {uploadedFiles.length > 0 && (
                <div className="mt-8 text-center">
                  <Button 
                    size="lg" 
                    onClick={analyzeBreed}
                    disabled={isAnalyzing}
                    className="gradient-primary glow-primary px-8 py-4"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Breed"
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
                  <div className="text-3xl font-bold text-primary mb-2 gradient-primary bg-clip-text text-transparent">
                    {results.breedName}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    Confidence: {results.confidence}%
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Hybridization Results */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Hybridization Analysis</h3>
                  <div className="space-y-3">
                    {results.hybridization.map((hybrid: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-card rounded-lg border slide-up">
                        <span className="font-medium">{hybrid.breed}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-3 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full gradient-primary transition-all duration-1000"
                              style={{ width: `${hybrid.percentage}%` }}
                            />
                          </div>
                          <span className="font-bold text-primary">{hybrid.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Tabs */}
                <Tabs defaultValue="images" className="fade-in-up">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="images" className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      See Images
                    </TabsTrigger>
                    <TabsTrigger value="info" className="flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      More Information
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="images" className="mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="aspect-square bg-card rounded-lg border rotate-glow hover:scale-105 transition-transform cursor-pointer">
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Image className="w-8 h-8" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="info" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-6">
                        <h4 className="font-semibold text-primary mb-3">Milk Yield</h4>
                        <p className="text-muted-foreground">12-15 liters per day on average</p>
                      </Card>
                      <Card className="p-6">
                        <h4 className="font-semibold text-primary mb-3">Origin Region</h4>
                        <p className="text-muted-foreground">Gujarat, India (Kathiawar Peninsula)</p>
                      </Card>
                      <Card className="p-6">
                        <h4 className="font-semibold text-primary mb-3">Key Traits</h4>
                        <p className="text-muted-foreground">Heat tolerant, disease resistant, good mothering ability</p>
                      </Card>
                      <Card className="p-6">
                        <h4 className="font-semibold text-primary mb-3">Body Weight</h4>
                        <p className="text-muted-foreground">300-400 kg (Cows), 450-500 kg (Bulls)</p>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreedRecognition;