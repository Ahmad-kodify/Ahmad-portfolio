import type { ServiceId } from '@/lib/services';

/**
 * Code-drawn module mock-ups for the Services page — one per service.
 * Kept in brand: white cards, cream surfaces, terracotta/peach accents.
 */
export function ServiceMock({ id }: { id: ServiceId }) {
  switch (id) {
    case 'websites':
      return <WebsiteMock />;
    case 'bookings':
      return <BookingsMock />;
    case 'crm':
      return <CrmMock />;
    case 'followups':
      return <FollowupsMock />;
    case 'custom':
      return <CustomMock />;
    case 'integrations':
      return <IntegrationsMock />;
  }
}

function Line({ w, tone = 'ink', h = 'h-2' }: { w: string; tone?: 'ink' | 'peach' | 'muted' | 'cream'; h?: string }) {
  const color =
    tone === 'peach' ? 'bg-peach' : tone === 'muted' ? 'bg-ink/10' : tone === 'cream' ? 'bg-cream/30' : 'bg-ink/25';
  return <span className={`block ${h} rounded-full ${color}`} style={{ width: w }} />;
}

function Badge({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        dark ? 'bg-ink text-cream' : 'bg-peach-soft text-ink'
      }`}
    >
      {children}
    </span>
  );
}

function WebsiteMock() {
  return (
    <div className="relative h-full w-full p-5 sm:p-7">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink/5">
        <div className="browser-bar flex items-center gap-3 border-b border-line px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          </span>
          <span className="mx-auto rounded-md bg-white/80 px-3 py-0.5 text-[10px] text-muted ring-1 ring-ink/5">yourbusiness.co.uk</span>
        </div>
        <div className="grid flex-1 grid-cols-5 gap-4 p-5">
          <div className="col-span-3 flex flex-col justify-center space-y-2.5">
            <span className="w-fit rounded-full bg-terracotta px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-white">Local experts</span>
            <Line w="90%" h="h-3" />
            <Line w="70%" h="h-3" />
            <Line w="55%" tone="peach" h="h-3" />
            <div className="pt-2">
              <span className="inline-block rounded-full bg-ink px-3 py-1.5 text-[9px] font-semibold text-cream">Book a visit →</span>
            </div>
          </div>
          <div className="col-span-2 rounded-xl bg-peach-soft" />
        </div>
      </div>
      <div className="absolute bottom-2 left-2 flex flex-wrap gap-2 sm:bottom-4 sm:left-4">
        <Badge dark>
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta" /> Lighthouse 98
        </Badge>
        <Badge>Google · Page 1</Badge>
      </div>
    </div>
  );
}

function BookingsMock() {
  const rows = [
    ['Web form', 'Boiler service', '12s'],
    ['WhatsApp', 'Emergency call-out', '8s'],
    ['Phone', 'Missed → text sent', '30s'],
  ];
  return (
    <div className="flex h-full w-full flex-col gap-3 p-5 sm:p-7">
      <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink/5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-terracotta">Inbox · all sources</p>
          <Badge dark>3 new</Badge>
        </div>
        <ul className="mt-3 divide-y divide-line">
          {rows.map(([src, what, t]) => (
            <li key={src} className="flex items-center gap-3 py-2.5">
              <span className="h-7 w-7 shrink-0 rounded-full bg-peach-soft" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-ink">{what}</p>
                <p className="text-[10px] text-muted">{src}</p>
              </div>
              <span className="text-[10px] font-medium text-muted">Replied in {t}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-cream">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-terracotta">New booking</p>
          <p className="text-[12px] font-semibold">Thu 10:30 · Sarah M.</p>
        </div>
        <span className="rounded-full bg-terracotta px-2.5 py-1 text-[10px] font-semibold">Reminder set</span>
      </div>
    </div>
  );
}

function CrmMock() {
  const timeline = ['Enquiry · web', 'Quote sent · £420', 'Job done', 'Review · 5 stars'];
  return (
    <div className="h-full w-full p-5 sm:p-7">
      <div className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-card ring-1 ring-ink/5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta text-[12px] font-bold text-white">SM</span>
          <div>
            <p className="text-[13px] font-bold text-ink">Sarah M.</p>
            <p className="text-[10px] text-muted">Customer since 2024 · 3 jobs</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-terracotta">Lifetime</p>
            <p className="text-[14px] font-extrabold tracking-tight text-ink">£1,240</p>
          </div>
        </div>
        <div className="mt-3 flex gap-1.5">
          {['Boiler', 'Annual plan', 'SW19'].map((t) => (
            <span key={t} className="rounded-full bg-cream px-2 py-0.5 text-[9px] font-medium text-ink/70">
              {t}
            </span>
          ))}
        </div>
        <ol className="relative mt-4 space-y-2.5 border-l border-dashed border-terracotta/40 pl-4">
          {timeline.map((t, i) => (
            <li key={t} className="relative text-[11px] font-medium text-ink">
              <span className={`absolute -left-[21.5px] top-1 h-2.5 w-2.5 rounded-full ${i === timeline.length - 1 ? 'bg-terracotta' : 'bg-peach'}`} />
              {t}
            </li>
          ))}
        </ol>
        <div className="mt-auto rounded-xl bg-cream px-3 py-2 text-[10px] text-body">
          <span className="font-semibold text-ink">Note:</span> prefers WhatsApp, mornings.
        </div>
      </div>
    </div>
  );
}

function FollowupsMock() {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-3 p-5 sm:p-7">
      <div className="space-y-2.5">
        <div className="ml-auto w-[85%] rounded-2xl rounded-br-sm bg-ink p-3 text-[11px] leading-snug text-cream">
          Hi Sarah, it&apos;s been 11 months since your last boiler service. Shall we book your annual check?
          <span className="mt-2 block w-fit rounded-full bg-terracotta px-2.5 py-1 text-[10px] font-semibold">Book a slot</span>
        </div>
        <div className="w-[60%] rounded-2xl rounded-bl-sm bg-white p-3 text-[11px] text-ink shadow-card ring-1 ring-ink/5">
          Yes please. Thursday morning?
        </div>
        <div className="ml-auto w-[70%] rounded-2xl rounded-br-sm bg-ink p-3 text-[11px] text-cream">
          Booked for Thu 10:30. See you then.
        </div>
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink/5">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-terracotta">Sequence · Annual service</p>
        <div className="mt-3 flex items-center gap-2">
          {['Day 0', 'Day 3', 'Day 30', 'Day 330'].map((d, i) => (
            <div key={d} className="flex flex-1 items-center gap-2">
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${i < 3 ? 'bg-terracotta' : 'bg-peach'}`} />
              <span className="text-[9px] font-medium text-ink/70">{d}</span>
              {i < 3 && <span className="h-px flex-1 bg-ink/10" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CustomMock() {
  return (
    <div className="flex h-full w-full flex-col gap-3 p-5 sm:p-7">
      <div className="flex-1 overflow-hidden rounded-2xl bg-ink p-4 font-mono text-[10px] leading-relaxed text-cream/80 shadow-card">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-cream/50">app/Models/Booking.php</span>
          <Badge>
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta" /> Deployed · v2.4
          </Badge>
        </div>
        <p>
          <span className="text-peach">class</span> Booking <span className="text-peach">extends</span> Model
        </p>
        <p className="pl-3">
          <span className="text-terracotta">public function</span> customer()
        </p>
        <p className="pl-6">return $this-&gt;belongsTo(Customer::class);</p>
        <p className="pl-3">
          <span className="text-terracotta">public function</span> followUps()
        </p>
        <p className="pl-6">return $this-&gt;hasMany(FollowUp::class);</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {['Admin', 'Seller', 'Customer'].map((r) => (
          <span key={r} className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-ink shadow-card ring-1 ring-ink/5">
            {r}
          </span>
        ))}
        <span className="ml-auto rounded-full bg-peach-soft px-2.5 py-1 text-[10px] font-semibold text-ink">Stripe · connected</span>
      </div>
    </div>
  );
}

function IntegrationsMock() {
  const tools = ['Stripe', 'Xero', 'Google Calendar', 'WhatsApp'];
  return (
    <div className="flex h-full w-full flex-col gap-3 p-5 sm:p-7">
      <div className="relative flex items-center justify-between">
        <div className="flex flex-col gap-2">
          {tools.slice(0, 2).map((t) => (
            <span key={t} className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-ink shadow-card ring-1 ring-ink/5">
              {t}
            </span>
          ))}
        </div>
        <span className="absolute left-[22%] right-[22%] top-1/2 h-px border-t border-dashed border-terracotta/50" aria-hidden />
        <span className="relative rounded-xl bg-terracotta px-3 py-2 text-[10px] font-extrabold text-white shadow-pill">Arkar</span>
        <div className="flex flex-col gap-2">
          {tools.slice(2).map((t) => (
            <span key={t} className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-ink shadow-card ring-1 ring-ink/5">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2.5">
        {[
          ['Leads', '42'],
          ['Revenue', '£18.4k'],
          ['Repeat', '64%'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl bg-white p-3 shadow-card ring-1 ring-ink/5">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-terracotta">{k}</p>
            <p className="mt-1 text-[15px] font-extrabold tracking-tight text-ink">{v}</p>
          </div>
        ))}
        <div className="col-span-3 flex items-end gap-1.5 rounded-2xl bg-white p-3 shadow-card ring-1 ring-ink/5">
          {[30, 45, 40, 60, 55, 75, 65, 85, 80, 100].map((h, i) => (
            <span key={i} className={`flex-1 rounded-t ${i === 9 ? 'bg-terracotta' : 'bg-peach'}`} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
