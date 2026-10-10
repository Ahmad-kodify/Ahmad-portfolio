/**
 * Code-drawn stand-ins for projects that have no screenshot yet.
 * Replace by dropping a real screenshot into tmp-images/ and running `npm run images`.
 */
export function ProjectVisual({ id }: { id: string }) {
  if (id === 'schuul') return <SchuulVisual />;
  if (id === 'tayfa') return <TayfaVisual />;
  return <DashboardVisual />;
}

function Bar({ w, tone = 'ink' }: { w: string; tone?: 'ink' | 'peach' | 'muted' }) {
  const color = tone === 'peach' ? 'bg-peach' : tone === 'muted' ? 'bg-ink/10' : 'bg-ink/25';
  return <span className={`block h-1.5 rounded-full ${color}`} style={{ width: w }} />;
}

function SchuulVisual() {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const booked = new Set([3, 8, 9, 15, 16, 22, 23, 24]);
  return (
    <div className="absolute inset-0 bg-cream p-5 sm:p-7">
      <div className="grid h-full grid-cols-5 gap-4">
        <div className="col-span-3 flex flex-col rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink/5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-terracotta">Availability</span>
            <span className="rounded-full bg-cream px-2 py-0.5 text-[10px] font-semibold text-ink/70">March</span>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1.5">
            {days.map((d) => (
              <span
                key={d}
                className={`flex aspect-square items-center justify-center rounded-md text-[9px] font-semibold ${
                  booked.has(d) ? 'bg-terracotta text-white' : d % 6 === 0 ? 'bg-peach-soft text-ink' : 'bg-cream text-ink/50'
                }`}
              >
                {d}
              </span>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between rounded-xl bg-ink px-3 py-2 text-[10px] font-semibold text-cream">
            <span>Thu 14 · 16:00</span>
            <span className="rounded-full bg-terracotta px-2 py-0.5">Book</span>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          {['Maths · A-Level', 'Physics · GCSE', 'French · KS3'].map((t, i) => (
            <div key={t} className="flex items-center gap-2.5 rounded-2xl bg-white p-3 shadow-card ring-1 ring-ink/5">
              <span className={`h-8 w-8 shrink-0 rounded-full ${i === 0 ? 'bg-terracotta' : i === 1 ? 'bg-peach' : 'bg-ink/15'}`} />
              <div className="flex-1 space-y-1.5">
                <Bar w="70%" />
                <p className="text-[9px] font-medium text-ink/60">{t}</p>
              </div>
            </div>
          ))}
          <div className="mt-auto rounded-2xl bg-white p-3 shadow-card ring-1 ring-ink/5">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-terracotta">Stripe payout</p>
            <p className="mt-1 text-sm font-extrabold tracking-tight text-ink">£1,860.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TayfaVisual() {
  return (
    <div className="absolute inset-0 bg-cream p-5 sm:p-7">
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-card ring-1 ring-ink/5">
          <span className="h-2 w-2 rounded-full bg-terracotta" />
          <Bar w="40%" tone="muted" />
          <span className="ml-auto rounded-full bg-ink px-2 py-0.5 text-[9px] font-semibold text-cream">Seller dashboard</span>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col rounded-2xl bg-white p-2.5 shadow-card ring-1 ring-ink/5">
              <span className={`aspect-[4/3] w-full rounded-xl ${i % 3 === 0 ? 'bg-peach' : i % 3 === 1 ? 'bg-peach-soft' : 'bg-cream'}`} />
              <div className="mt-2 space-y-1.5">
                <Bar w="80%" />
                <Bar w="45%" tone="peach" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-ink px-4 py-2.5 text-[10px] font-semibold text-cream">
          <span>Order #1042 · 3 items</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
            Shipped
          </span>
        </div>
      </div>
    </div>
  );
}

function DashboardVisual() {
  return (
    <div className="absolute inset-0 bg-cream p-6">
      <div className="grid h-full grid-cols-3 gap-3">
        {['Leads', 'Booked', 'Repeat'].map((k, i) => (
          <div key={k} className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink/5">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-terracotta">{k}</p>
            <p className="mt-2 text-2xl font-extrabold tracking-tight text-ink">{[42, 31, 64][i]}{i === 2 ? '%' : ''}</p>
          </div>
        ))}
        <div className="col-span-3 flex items-end gap-1.5 rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink/5">
          {[30, 50, 40, 70, 55, 80, 65, 90, 75, 95].map((h, i) => (
            <span key={i} className={`flex-1 rounded-t-md ${i === 9 ? 'bg-terracotta' : 'bg-peach'}`} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
