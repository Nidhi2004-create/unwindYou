import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const BookingSystem = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCounselor, setSelectedCounselor] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const counselors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Anxiety & Depression',
      experience: '8 years',
      rating: 4.9,
      image: 'Professional female counselor with warm smile'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Academic Stress',
      experience: '6 years',
      rating: 4.8,
      image: 'Professional male counselor in office setting'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Relationship Issues',
      experience: '10 years',
      rating: 4.9,
      image: 'Professional female counselor with friendly demeanor'
    }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const sessionTypes = [
    { id: 'individual', name: 'Individual Counseling', duration: '50 minutes' },
    { id: 'group', name: 'Group Therapy', duration: '90 minutes' },
    { id: 'crisis', name: 'Crisis Intervention', duration: '30 minutes' },
    { id: 'wellness', name: 'Wellness Check-in', duration: '25 minutes' }
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedCounselor || !sessionType) {
      toast({
        title: "Please fill in all required fields",
        description: "Make sure to select a date, time, counselor, and session type.",
        variant: "destructive"
      });
      return;
    }

    // Store booking in localStorage
    const booking = {
      id: Date.now(),
      date: selectedDate,
      time: selectedTime,
      counselor: counselors.find(c => c.id === parseInt(selectedCounselor)),
      sessionType: sessionTypes.find(s => s.id === sessionType),
      isAnonymous,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    const existingBookings = JSON.parse(localStorage.getItem('mindcare_bookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('mindcare_bookings', JSON.stringify(existingBookings));

    toast({
      title: "✅ Session Booked Successfully!",
      description: `Your ${isAnonymous ? 'anonymous' : 'regular'} session is confirmed for ${selectedDate} at ${selectedTime}.`
    });

    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setSelectedCounselor('');
    setSessionType('');
  };

  const getNextWeekDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  return (
    <div className="pt-24 pb-8 px-4 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">Book a Counseling Session</h1>
          <p className="text-gray-600 text-lg">
            Schedule a confidential session with our licensed mental health professionals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect rounded-3xl p-8"
            >
              {/* Privacy Toggle */}
              <div className="mb-8 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Anonymous Session</h3>
                      <p className="text-sm text-gray-600">Your identity will be completely protected</p>
                    </div>
                  </div>
                  <Button
                    variant={isAnonymous ? "default" : "outline"}
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className="ml-4"
                  >
                    {isAnonymous ? 'Anonymous' : 'Regular'}
                  </Button>
                </div>
              </div>

              {/* Session Type Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sessionTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        sessionType === type.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSessionType(type.id)}
                    >
                      <h4 className="font-semibold text-gray-800">{type.name}</h4>
                      <p className="text-sm text-gray-600">{type.duration}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Date</h3>
                <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                  {getNextWeekDates().map((date) => {
                    const dateObj = new Date(date);
                    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                    const dayNumber = dateObj.getDate();
                    
                    return (
                      <div
                        key={date}
                        className={`p-3 text-center rounded-xl cursor-pointer transition-all ${
                          selectedDate === date
                            ? 'bg-blue-500 text-white'
                            : 'bg-white border border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => setSelectedDate(date)}
                      >
                        <div className="text-xs font-medium">{dayName}</div>
                        <div className="text-lg font-bold">{dayNumber}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Time</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      className="w-full"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Counselor Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Counselor</h3>
                <div className="space-y-4">
                  {counselors.map((counselor) => (
                    <div
                      key={counselor.id}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedCounselor === counselor.id.toString()
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedCounselor(counselor.id.toString())}
                    >
                      <div className="flex items-center space-x-4">
                        <img 
                          className="w-16 h-16 rounded-full object-cover"
                          alt={`${counselor.name} profile photo`}
                         src="https://images.unsplash.com/photo-1567171461289-df70ea0e6c94" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{counselor.name}</h4>
                          <p className="text-sm text-gray-600">{counselor.specialty}</p>
                          <p className="text-xs text-gray-500">{counselor.experience} experience • ⭐ {counselor.rating}</p>
                        </div>
                        {selectedCounselor === counselor.id.toString() && (
                          <CheckCircle className="w-6 h-6 text-blue-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleBooking}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 text-lg"
                size="lg"
              >
                Book Session
              </Button>
            </motion.div>
          </div>

          {/* Booking Summary & Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Session Type:</span>
                  <span className="font-medium">
                    {sessionType ? sessionTypes.find(s => s.id === sessionType)?.name : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{selectedTime || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Counselor:</span>
                  <span className="font-medium">
                    {selectedCounselor ? counselors.find(c => c.id === parseInt(selectedCounselor))?.name : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Privacy:</span>
                  <span className="font-medium">{isAnonymous ? 'Anonymous' : 'Regular'}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">What to Expect</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Completely confidential environment</li>
                <li>• Professional licensed counselors</li>
                <li>• Flexible rescheduling options</li>
                <li>• Follow-up resources provided</li>
                <li>• Crisis support available 24/7</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-effect rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Immediate Help?</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full" onClick={() => toast({ title: "🚧 Crisis hotline feature coming soon!" })}>
                  Crisis Hotline: 988
                </Button>
                <Button variant="outline" className="w-full" onClick={() => toast({ title: "🚧 Emergency services feature coming soon!" })}>
                  Emergency: 911
                </Button>
                <Button variant="outline" className="w-full" onClick={() => toast({ title: "🚧 Text support feature coming soon!" })}>
                  Text Support: 741741
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSystem;