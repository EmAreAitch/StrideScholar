import React from "react";
import { useForm } from "@inertiajs/react";
import {
  Select,
  TextInput,
  DatePicker,
  TimePicker,
  Checkbox,
  LinkUrl,
} from "./FormComponents";
import { dashboard } from "~/api";
const DAYS = {
  monday: 1,
  tuesday: 2,
  wednesday: 4,
  thursday: 8,
  friday: 16,
  saturday: 32,
  sunday: 64,
};

export default function NewRoom({ courses }) {
  const { data, setData, post, transform, processing, errors ,setError,clearErrors } = useForm({
    course_url: "",
    participants: "",
    days: 0,
    start_date: "",
    start_time: "",
    end_time: "",
    locked: false,
  });

  function handleSubmit(e) {
    e.preventDefault();
    transform((data) => ({ room: data }));
    post(dashboard.createRoom.path());
  }

  function handleDayChange(day) {
    const updatedDays = data.days ^ DAYS[day];
    setData("days", updatedDays);
  }

  function isDaySelected(day) {
    return (data.days & DAYS[day]) !== 0;
  }
  function validateURL(link){
    const udemyUrlPattern = /^https:\/\/(www\.)?udemy\.com\/course\/[a-zA-Z0-9-]+\/?(\?[\w=&]+)?$/;
    return udemyUrlPattern.test(link);
  }
  const handleUdemyUrlChange = (e) => {
    const url = e.target.value;
    setData("course_url",url);
    if(!validateURL(url)){
      setError('course_url', 'Invalid URL');
    } 
    else{
      clearErrors("course_url")
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 mb-8">
      <h1 className="text-5xl font-bold mb-6">Create New Room</h1>
      <form onSubmit={handleSubmit}>
       
        <LinkUrl type="url" 
          label="Course Link"
          value={data.course_url} 
          onChange={(e)=>handleUdemyUrlChange(e)}
          error={errors.course_url}>
        </LinkUrl>
        
        <TextInput
          label="Max enrollments allowed"
          name="participants"
          type="number"
          value={data.participants}
          onChange={(e) => setData("participants", e.target.value)}
          error={errors.participants}
        />
        <div className="mb-4">
          <label className="block text-lg font-semibold text-black mb-2">
            Days
          </label>
          <div className="space-y-4 mb-3">
            {Object.keys(DAYS).map((day) => (
              <Checkbox
                key={day}
                label={day.charAt(0).toUpperCase() + day.slice(1)}
                name={day}
                checked={isDaySelected(day)}
                onChange={() => handleDayChange(day)}
              />
            ))}
          </div>
          {errors.days && (
            <p className="mt-2 text-sm text-red-600">{errors.days}</p>
          )}
        </div>
        <DatePicker
          label="Start Date"
          name="start_date"
          value={data.start_date}
          onChange={(date) => setData("start_date", date)}
          error={errors.start_date}
        />
        <TimePicker
          label="Start Time"
          name="start_time"
          value={data.start_time}
          onChange={(time) => setData("start_time", time)}
          error={errors.start_time}
        />
        <TimePicker
          label="End Time"
          name="end_time"
          value={data.end_time}
          onChange={(time) => setData("end_time", time)}
          error={errors.end_time}
        />
        <div className="mt-6">
          <button
            type="submit"
            className="px-8 py-4 mt-4 text-lg font-semibold bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={processing}
          >
            Create Room
          </button>
        </div>
      </form>
    </div>
  );
}
