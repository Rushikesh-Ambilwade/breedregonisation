import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Navigation, Clock, Star } from "lucide-react";

interface Hospital {
  id: string;
  name: string;
  distance: string;
  contact: string;
  address: string;
  rating: number;
  specialization: string;
  availability: string;
}

const NearbyHospitals = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isUsingLocation, setIsUsingLocation] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);

  const states = ["Maharashtra", "Gujarat", "Punjab", "Haryana", "Rajasthan"];
  const districts = {
    "Maharashtra": ["Pune", "Mumbai", "Nashik", "Aurangabad"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
  };

  const searchHospitals = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockHospitals: Hospital[] = [
        {
          id: "1",
          name: "Green Valley Veterinary Hospital",
          distance: "2.3 km",
          contact: "+91 98765 43210",
          address: "MG Road, Near City Center",
          rating: 4.8,
          specialization: "Large Animals, Emergency Care",
          availability: "24/7 Emergency Service"
        },
        {
          id: "2",
          name: "Animal Care Clinic",
          distance: "4.1 km",
          contact: "+91 87654 32109",
          address: "Station Road, Medical Complex",
          rating: 4.5,
          specialization: "Cattle & Buffalo Specialist",
          availability: "Mon-Sat: 9 AM - 7 PM"
        },
        {
          id: "3",
          name: "Rural Veterinary Center",
          distance: "5.8 km",
          contact: "+91 76543 21098",
          address: "Village Road, Agricultural Zone",
          rating: 4.3,
          specialization: "Farm Animals, Breeding",
          availability: "Daily: 8 AM - 6 PM"
        },
        {
          id: "4",
          name: "Modern Pet & Livestock Clinic",
          distance: "7.2 km",
          contact: "+91 65432 10987",
          address: "Highway Road, Commercial Area",
          rating: 4.6,
          specialization: "Advanced Diagnostics",
          availability: "24/7 Service Available"
        }
      ];
      setHospitals(mockHospitals);
      setLoading(false);
    }, 2000);
  };

  const useCurrentLocation = () => {
    setIsUsingLocation(true);
    // Simulate GPS location
    setTimeout(() => {
      setSelectedState("Maharashtra");
      setSelectedDistrict("Pune");
      setSelectedCity("Pune");
      setIsUsingLocation(false);
      searchHospitals();
    }, 2000);
  };

  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h1 className="text-4xl font-bold text-primary mb-4">Nearby Veterinary Hospitals</h1>
          <p className="text-xl text-muted-foreground">
            Find qualified veterinarians and animal hospitals in your area
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Location Selection */}
          <Card className="mb-8 bounce-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Select Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {/* State */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">State</label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="glow-hover">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* District */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">District</label>
                  <Select 
                    value={selectedDistrict} 
                    onValueChange={setSelectedDistrict}
                    disabled={!selectedState}
                  >
                    <SelectTrigger className="glow-hover">
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedState && districts[selectedState as keyof typeof districts]?.map((district) => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* City/Village */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">City/Village</label>
                  <Select 
                    value={selectedCity} 
                    onValueChange={setSelectedCity}
                    disabled={!selectedDistrict}
                  >
                    <SelectTrigger className="glow-hover">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="pcmc">PCMC</SelectItem>
                      <SelectItem value="wakad">Wakad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Action</label>
                  <Button 
                    onClick={searchHospitals}
                    disabled={!selectedState || !selectedDistrict || !selectedCity || loading}
                    className="w-full gradient-primary glow-primary"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Searching...
                      </>
                    ) : (
                      "Find Hospitals"
                    )}
                  </Button>
                </div>
              </div>

              {/* GPS Location Button */}
              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={useCurrentLocation}
                  disabled={isUsingLocation}
                  className="glow-hover gradient-hero text-white border-none"
                >
                  {isUsingLocation ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Getting Location...
                    </>
                  ) : (
                    <>
                      <Navigation className="w-4 h-4 mr-2" />
                      Use My Current Location (GPS)
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hospitals List */}
          {hospitals.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-6 fade-in-up">
                Found {hospitals.length} Veterinary Hospitals Near You
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {hospitals.map((hospital, index) => (
                  <Card 
                    key={hospital.id} 
                    className="slide-up hover:scale-105 transition-all duration-300 rotate-glow cursor-pointer"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-primary mb-2">{hospital.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`w-4 h-4 ${
                                    star <= hospital.rating 
                                      ? 'text-accent fill-current' 
                                      : 'text-muted-foreground'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium">{hospital.rating}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{hospital.specialization}</p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary mb-1">{hospital.distance}</div>
                          <div className="text-xs text-muted-foreground">away</div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{hospital.address}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{hospital.contact}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{hospital.availability}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          className="flex-1 gradient-primary glow-primary"
                          onClick={() => window.open(`tel:${hospital.contact}`, '_self')}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="flex-1 glow-hover"
                          onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(hospital.name + " " + hospital.address)}`, '_blank')}
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Contact */}
          <Card className="mt-12 bg-accent/10 border-accent/20 fade-in-up">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-accent mb-3">Emergency Veterinary Services</h3>
              <p className="text-muted-foreground mb-4">
                For urgent cases requiring immediate attention, contact our 24/7 emergency hotline
              </p>
              <Button className="gradient-hero glow-accent">
                <Phone className="w-4 h-4 mr-2" />
                Emergency Hotline: 1800-VET-HELP
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NearbyHospitals;