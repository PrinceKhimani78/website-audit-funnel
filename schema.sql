-- 1. Create the audits table (Safely handles new or existing tables)
CREATE TABLE IF NOT EXISTS audits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    business TEXT,
    website TEXT NOT NULL,
    phone TEXT NOT NULL,
    industry TEXT,
    status TEXT DEFAULT 'new'
);

-- 2. Add new columns if they don't exist (for existing tables)
DO $$ 
BEGIN 
    -- Add updated_at
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='audits' AND column_name='updated_at') THEN
        ALTER TABLE audits ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;
    END IF;

    -- Add lead_type
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='audits' AND column_name='lead_type') THEN
        ALTER TABLE audits ADD COLUMN lead_type TEXT DEFAULT 'audit' CHECK (lead_type IN ('audit', 'blueprint'));
    END IF;

    -- Add raw_data
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='audits' AND column_name='raw_data') THEN
        ALTER TABLE audits ADD COLUMN raw_data JSONB DEFAULT '{}'::jsonb;
    END IF;

    -- Add notes
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='audits' AND column_name='notes') THEN
        ALTER TABLE audits ADD COLUMN notes TEXT;
    END IF;
END $$;

-- 2. Security (RLS)
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;

-- Policy Cleanup
DROP POLICY IF EXISTS "Allow public insert" ON audits;
DROP POLICY IF EXISTS "Allow authenticated read" ON audits;
DROP POLICY IF EXISTS "Allow authenticated update" ON audits;

-- Policy: Allow anyone to submit a lead (Public Insert)
CREATE POLICY "Allow public insert" ON audits
    FOR INSERT WITH CHECK (true);

-- Policy: Only you (Admin/Authenticated) can view leads
CREATE POLICY "Allow authenticated read" ON audits
    FOR SELECT TO authenticated USING (true);

-- Policy: Only you (Admin/Authenticated) can update leads
CREATE POLICY "Allow authenticated update" ON audits
    FOR UPDATE TO authenticated USING (true);

-- 3. Automatic "updated_at" Trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_audits_updated_at ON audits;
CREATE TRIGGER update_audits_updated_at
    BEFORE UPDATE ON audits
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- 4. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_audits_created_at ON audits (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audits_lead_type ON audits (lead_type);
CREATE INDEX IF NOT EXISTS idx_audits_status ON audits (status);

-- 5. Helper comment for managing leads
COMMENT ON TABLE audits IS 'Stores leads from the Audit and Project Blueprint funnel.';
