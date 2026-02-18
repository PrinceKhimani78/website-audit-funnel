-- Create the audits table
CREATE TABLE IF NOT EXISTS audits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    business TEXT,
    website TEXT NOT NULL,
    phone TEXT NOT NULL,
    industry TEXT,
    status TEXT DEFAULT 'pending'
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (anon access)
-- Note: In a production app, you might want to restrict this more.
CREATE POLICY "Allow public insert" ON audits
    FOR INSERT WITH CHECK (true);

-- Create a policy that allows authenticated users to read (for your dashboard)
CREATE POLICY "Allow authenticated read" ON audits
    FOR SELECT TO authenticated USING (true);
