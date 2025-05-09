'use client';

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { User } from '@/types';

interface CustomerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  customer: User | null;
  onCustomerUpdate: (customer: User) => void;
}

export default function CustomerDrawer({ isOpen, onClose, customer, onCustomerUpdate }: CustomerDrawerProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [localCustomer, setLocalCustomer] = useState<User | null>(customer);

  useEffect(() => {
    setLocalCustomer(customer);
  }, [customer]);

  if (!customer || !localCustomer) return null;

  const completedSteps = Object.values(localCustomer.onboarding).filter(Boolean).length;
  const totalSteps = Object.keys(localCustomer.onboarding).length;
  const progress = (completedSteps / totalSteps) * 100;

  const handlePlanChange = async (newPlan: string) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/users/${localCustomer.id}/subscription`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: newPlan }),
      });

      if (!response.ok) {
        throw new Error('Failed to update plan');
      }

      const updatedUser = await response.json();
      setLocalCustomer(updatedUser);
      onCustomerUpdate(updatedUser);
    } catch (error) {
      console.error('Error updating plan:', error);
      setLocalCustomer(customer);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOnboardingStepChange = async (step: string, completed: boolean) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/onboarding/${localCustomer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ step, completed }),
      });

      if (!response.ok) {
        throw new Error('Failed to update onboarding step');
      }

      const updatedUser = await response.json();
      setLocalCustomer(updatedUser);
      onCustomerUpdate(updatedUser);
    } catch (error) {
      console.error('Error updating onboarding step:', error);
      setLocalCustomer(customer);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-2xl font-semibold leading-6 text-gray-900">
                          Customer Details
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="relative flex-1 px-4 sm:px-6">
                      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
                          <Tab
                            className={({ selected }) =>
                              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                              ${selected
                                ? 'bg-white text-indigo-700 shadow'
                                : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                              }`
                            }
                          >
                            Profile
                          </Tab>
                          <Tab
                            className={({ selected }) =>
                              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                              ${selected
                                ? 'bg-white text-indigo-700 shadow'
                                : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                              }`
                            }
                          >
                            Subscription
                          </Tab>
                          <Tab
                            className={({ selected }) =>
                              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                              ${selected
                                ? 'bg-white text-indigo-700 shadow'
                                : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                              }`
                            }
                          >
                            Onboarding
                          </Tab>
                        </Tab.List>
                        <Tab.Panels className="mt-4">
                          {/* Profile Tab */}
                          <Tab.Panel>
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg font-medium text-gray-900 mb-3">Basic Information</h4>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                  <div>
                                    <span className="text-sm font-medium text-gray-500">Name</span>
                                    <p className="mt-1 text-sm text-gray-900">{localCustomer.name}</p>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium text-gray-500">Email</span>
                                    <p className="mt-1 text-sm text-gray-900">{localCustomer.email}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Tab.Panel>

                          {/* Subscription Tab */}
                          <Tab.Panel>
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg font-medium text-gray-900 mb-3">Subscription Details</h4>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                  <div>
                                    <span className="text-sm font-medium text-gray-500">Current Plan</span>
                                    <div className="mt-2">
                                      <select
                                        value={localCustomer.plan}
                                        onChange={(e) => handlePlanChange(e.target.value)}
                                        disabled={isUpdating}
                                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      >
                                        <option value="Basic">Basic</option>
                                        <option value="Pro">Pro</option>
                                        <option value="Enterprise">Enterprise</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium text-gray-500">Status</span>
                                    <p className="mt-1">
                                      <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium
                                        ${localCustomer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {localCustomer.status}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Tab.Panel>

                          {/* Onboarding Tab */}
                          <Tab.Panel>
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg font-medium text-gray-900 mb-3">Onboarding Progress</h4>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span className="text-gray-500">Overall Progress</span>
                                      <span className="text-gray-900">{Math.round(progress)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                      <div
                                        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                  <div className="space-y-3">
                                    {Object.entries(localCustomer.onboarding).map(([step, completed]) => (
                                      <div key={step} className="flex items-center justify-between">
                                        <label className="flex items-center space-x-3">
                                          <input
                                            type="checkbox"
                                            checked={completed}
                                            onChange={(e) => handleOnboardingStepChange(step, e.target.checked)}
                                            disabled={isUpdating}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                          />
                                          <span className="text-sm text-gray-900">
                                            {step.replace(/([A-Z])/g, ' $1').trim()}
                                          </span>
                                        </label>
                                        <span className={`text-sm ${completed ? 'text-green-600' : 'text-gray-400'}`}>
                                          {completed ? 'Completed' : 'Pending'}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Tab.Panel>
                        </Tab.Panels>
                      </Tab.Group>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 