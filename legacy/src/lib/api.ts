/**
 * Thin fetch wrapper around the portfolio API. Admin auth rides on an httpOnly
 * cookie, so every call just needs `credentials: 'include'`.
 */

export interface Testimonial {
  id: number;
  name: string;
  feedback: string;
  createdAt: string;
}

export interface AdminTestimonial extends Testimonial {
  email: string | null;
  status: TestimonialStatus;
}

export type TestimonialStatus = 'pending' | 'approved' | 'rejected';

export type StatusCounts = Record<TestimonialStatus, number>;

export class ApiError extends Error {
  status: number;
  fields?: Record<string, string>;

  constructor(message: string, status: number, fields?: Record<string, string>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fields = fields;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`/api${path}`, {
      credentials: 'include',
      headers: init.body ? { 'Content-Type': 'application/json' } : undefined,
      ...init,
    });
  } catch {
    throw new ApiError('Unable to reach the server. Please try again.', 0);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(
      data.error || 'Something went wrong. Please try again.',
      response.status,
      data.fields,
    );
  }

  return data as T;
}

// ------------------------------------------------------------------ public ---

export function fetchApprovedTestimonials() {
  return request<{ testimonials: Testimonial[] }>('/testimonials');
}

export function submitTestimonial(payload: {
  name: string;
  feedback: string;
  email?: string;
  /** Honeypot — always sent empty by real visitors. */
  website?: string;
}) {
  return request<{ ok: true }>('/testimonials', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// ------------------------------------------------------------------- admin ---

export function adminLogin(email: string, password: string) {
  return request<{ admin: { email: string } }>('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function adminLogout() {
  return request<{ ok: true }>('/admin/logout', { method: 'POST' });
}

export function adminMe() {
  return request<{ admin: { email: string } }>('/admin/me');
}

export function adminListTestimonials(status: TestimonialStatus) {
  return request<{ testimonials: AdminTestimonial[]; counts: StatusCounts }>(
    `/admin/testimonials?status=${status}`,
  );
}

export function adminSetStatus(id: number, status: TestimonialStatus) {
  return request<{ ok: true; counts: StatusCounts }>(`/admin/testimonials/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function adminDeleteTestimonial(id: number) {
  return request<{ ok: true; counts: StatusCounts }>(`/admin/testimonials/${id}`, {
    method: 'DELETE',
  });
}

// ---------------------------------------------------------------- contact ---

export type MessageStatus = 'new' | 'read' | 'archived';

export type MessageCounts = Record<MessageStatus, number>;

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  service: string;
  businessCategory: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
}

export function submitContactMessage(payload: {
  name: string;
  email: string;
  service: string;
  businessCategory: string;
  message: string;
  /** Honeypot — always sent empty by real visitors. */
  website?: string;
}) {
  return request<{ ok: true }>('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function adminListMessages(status: MessageStatus) {
  return request<{ messages: ContactMessage[]; counts: MessageCounts }>(
    `/admin/messages?status=${status}`,
  );
}

export function adminSetMessageStatus(id: number, status: MessageStatus) {
  return request<{ ok: true; counts: MessageCounts }>(`/admin/messages/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function adminDeleteMessage(id: number) {
  return request<{ ok: true; counts: MessageCounts }>(`/admin/messages/${id}`, {
    method: 'DELETE',
  });
}
