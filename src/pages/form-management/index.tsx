// import React, { useState } from "react";
// import {
//   Eye,
//   Mail,
//   Calendar,
//   User,
//   MessageSquare,
//   Search,
//   Filter,
//   CheckCircle,
//   XCircle,
//   Clock,
//   Archive,
// } from "lucide-react";

// // Mock data for forms
// const mockForms = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john.doe@example.com",
//     subject: "Painting Commission Request",
//     message:
//       "I'm interested in commissioning a landscape painting for my living room. I'd like something with mountains and a sunset theme. My budget is around $500-800.",
//     submittedAt: "2024-01-15T10:30:00Z",
//     status: "pending",
//     priority: "medium",
//   },
//   {
//     id: 2,
//     name: "Sarah Johnson",
//     email: "sarah.j@example.com",
//     subject: "Gallery Exhibition Inquiry",
//     message:
//       "Hello, I represent a local gallery and we're interested in featuring your work in our upcoming exhibition. Could we schedule a meeting to discuss this opportunity?",
//     submittedAt: "2024-01-14T14:22:00Z",
//     status: "reviewed",
//     priority: "high",
//   },
//   {
//     id: 3,
//     name: "Mike Chen",
//     email: "mike.chen@example.com",
//     subject: "Painting Technique Workshop",
//     message:
//       "Do you offer painting workshops? I'm particularly interested in learning watercolor techniques. Please let me know about available classes and pricing.",
//     submittedAt: "2024-01-13T09:15:00Z",
//     status: "responded",
//     priority: "low",
//   },
//   {
//     id: 4,
//     name: "Emily Rodriguez",
//     email: "emily.r@example.com",
//     subject: "Art Purchase Inquiry",
//     message:
//       "I saw your Ocean Waves painting on your website and I'm very interested in purchasing it. Is it still available? What are the payment options?",
//     submittedAt: "2024-01-12T16:45:00Z",
//     status: "pending",
//     priority: "high",
//   },
//   {
//     id: 5,
//     name: "David Wilson",
//     email: "d.wilson@example.com",
//     subject: "Collaboration Proposal",
//     message:
//       "I'm a photographer and I'd love to explore a collaboration between photography and painting. Would you be interested in discussing a joint project?",
//     submittedAt: "2024-01-11T11:20:00Z",
//     status: "archived",
//     priority: "medium",
//   },
// ];

// const FormManagement = () => {
//   const [forms, setForms] = useState(mockForms);
//   const [selectedForm, setSelectedForm] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [filterPriority, setFilterPriority] = useState("all");

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "reviewed":
//         return "bg-blue-100 text-blue-800";
//       case "responded":
//         return "bg-green-100 text-green-800";
//       case "archived":
//         return "bg-gray-100 text-gray-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case "high":
//         return "bg-red-100 text-red-800";
//       case "medium":
//         return "bg-yellow-100 text-yellow-800";
//       case "low":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "pending":
//         return <Clock className="h-4 w-4" />;
//       case "reviewed":
//         return <Eye className="h-4 w-4" />;
//       case "responded":
//         return <CheckCircle className="h-4 w-4" />;
//       case "archived":
//         return <Archive className="h-4 w-4" />;
//       default:
//         return <Clock className="h-4 w-4" />;
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const truncateText = (text, maxLength = 60) => {
//     return text.length > maxLength
//       ? text.substring(0, maxLength) + "..."
//       : text;
//   };

//   const filteredForms = forms.filter((form) => {
//     const matchesSearch =
//       form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       form.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       form.subject.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       filterStatus === "all" || form.status === filterStatus;
//     const matchesPriority =
//       filterPriority === "all" || form.priority === filterPriority;
//     return matchesSearch && matchesStatus && matchesPriority;
//   });

//   const handleView = (form) => {
//     setSelectedForm(form);
//     setShowModal(true);
//   };

//   const handleStatusChange = (formId, newStatus) => {
//     setForms(
//       forms.map((form) =>
//         form.id === formId ? { ...form, status: newStatus } : form
//       )
//     );
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedForm(null);
//   };

//   const getStatusCounts = () => {
//     return {
//       pending: forms.filter((f) => f.status === "pending").length,
//       reviewed: forms.filter((f) => f.status === "reviewed").length,
//       responded: forms.filter((f) => f.status === "responded").length,
//       archived: forms.filter((f) => f.status === "archived").length,
//     };
//   };

//   const statusCounts = getStatusCounts();

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Form Management</h1>
//           <p className="text-gray-600 mt-1">
//             Manage inquiries and messages from your website
//           </p>
//         </div>
//         <div className="flex space-x-2">
//           <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//             <Archive className="h-4 w-4 mr-2" />
//             Archive Selected
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm border">
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
//                 <Clock className="h-4 w-4 text-yellow-600" />
//               </div>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-500">Pending</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {statusCounts.pending}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border">
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                 <Eye className="h-4 w-4 text-blue-600" />
//               </div>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-500">Reviewed</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {statusCounts.reviewed}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border">
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                 <CheckCircle className="h-4 w-4 text-green-600" />
//               </div>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-500">Responded</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {statusCounts.responded}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border">
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
//                 <Archive className="h-4 w-4 text-gray-600" />
//               </div>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-500">Archived</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {statusCounts.archived}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filter */}
//       <div className="bg-white p-4 rounded-lg shadow-sm border">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by name, email, or subject..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               <Filter className="h-4 w-4 text-gray-400" />
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="all">All Status</option>
//                 <option value="pending">Pending</option>
//                 <option value="reviewed">Reviewed</option>
//                 <option value="responded">Responded</option>
//                 <option value="archived">Archived</option>
//               </select>
//             </div>
//             <select
//               value={filterPriority}
//               onChange={(e) => setFilterPriority(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="all">All Priority</option>
//               <option value="high">High</option>
//               <option value="medium">Medium</option>
//               <option value="low">Low</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Forms Table */}
//       <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Contact
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Subject
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Message
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Priority
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredForms.map((form) => (
//                 <tr key={form.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10">
//                         <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
//                           <User className="h-5 w-5 text-blue-600" />
//                         </div>
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">
//                           {form.name}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {form.email}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{form.subject}</div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-gray-900 max-w-xs">
//                       {truncateText(form.message)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
//                         form.priority
//                       )}`}
//                     >
//                       {form.priority}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <span
//                         className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
//                           form.status
//                         )}`}
//                       >
//                         {getStatusIcon(form.status)}
//                         <span className="ml-1">{form.status}</span>
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {formatDate(form.submittedAt)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleView(form)}
//                         className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
//                         title="View Details"
//                       >
//                         <Eye className="h-4 w-4" />
//                       </button>
//                       <select
//                         value={form.status}
//                         onChange={(e) =>
//                           handleStatusChange(form.id, e.target.value)
//                         }
//                         className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="reviewed">Reviewed</option>
//                         <option value="responded">Responded</option>
//                         <option value="archived">Archived</option>
//                       </select>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && selectedForm && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
//           <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-medium text-gray-900">
//                 Form Details
//               </h3>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <XCircle className="h-6 w-6" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Name
//                   </label>
//                   <p className="mt-1 text-sm text-gray-900">
//                     {selectedForm.name}
//                   </p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <p className="mt-1 text-sm text-gray-900">
//                     {selectedForm.email}
//                   </p>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Subject
//                 </label>
//                 <p className="mt-1 text-sm text-gray-900">
//                   {selectedForm.subject}
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Message
//                 </label>
//                 <div className="mt-1 p-3 bg-gray-50 rounded-md">
//                   <p className="text-sm text-gray-900">
//                     {selectedForm.message}
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Priority
//                   </label>
//                   <span
//                     className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
//                       selectedForm.priority
//                     )}`}
//                   >
//                     {selectedForm.priority}
//                   </span>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Status
//                   </label>
//                   <span
//                     className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
//                       selectedForm.status
//                     )}`}
//                   >
//                     {getStatusIcon(selectedForm.status)}
//                     <span className="ml-1">{selectedForm.status}</span>
//                   </span>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Submitted
//                   </label>
//                   <p className="mt-1 text-sm text-gray-900">
//                     {formatDate(selectedForm.submittedAt)}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={() => {
//                   window.location.href = `mailto:${selectedForm.email}?subject=Re: ${selectedForm.subject}`;
//                 }}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-flex items-center"
//               >
//                 <Mail className="h-4 w-4 mr-2" />
//                 Reply
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FormManagement;
