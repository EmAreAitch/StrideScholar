import React from 'react'
export const LinkUrl=({label,course_url,onChange,error})=>(
<div className="mb-4">
    <label htmlFor={course_url} className="block mb-2 text-lg font-semibold">{label}</label>
    <input type="url"
      value={course_url}
      onChange={onChange}
      className="w-full p-2 border rounded "
    ></input>
     {error && <div className="text-red-500 mt-1">{error}</div>}
  </div>
)

export const Select = ({ label, name, children, value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block mb-2 text-lg font-semibold">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded"
    >
      {children}
    </select>
    {error && <div className="text-red-500 mt-1">{error}</div>}
  </div>
)

export const TextInput = ({ label, name, type = 'text', value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block mb-2 text-lg font-semibold">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded"
    />
    {error && <div className="text-red-500 mt-1">{error}</div>}
  </div>
)

export const DatePicker = ({ label, name, value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block mb-2 text-lg font-semibold">{label}</label>
    <input
      type="date"
      id={name}
      name={name}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full p-2 border rounded"
    />
    {error && <div className="text-red-500 mt-1">{error}</div>}
  </div>
)

export const TimePicker = ({ label, name, value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block mb-2 font-semibold">{label}</label>
    <input
      type="time"
      id={name}
      name={name}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full p-2 border rounded"
    />
    {error && <div className="text-red-500 mt-1">{error}</div>}
  </div>
)

export const Checkbox = ({ label, name, checked, onChange }) => (
  <div className="mb-4">
    <label className="flex items-center">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      <span className="font-bold">{label}</span>
    </label>
  </div>
)