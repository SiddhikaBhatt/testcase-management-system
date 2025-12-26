CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'test-lead', 'tester', 'read-only')) 
         DEFAULT 'tester',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    description TEXT,
    version VARCHAR(50),
    status VARCHAR(50),
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE test_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    priority VARCHAR(20) CHECK (priority IN ('Low','Medium','High','Critical')),
    type VARCHAR(30) CHECK (type IN ('Functional','Regression','API','UI','Integration')),
    pre_conditions TEXT,
    post_conditions TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE test_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    testcase_id UUID REFERENCES test_cases(id) ON DELETE CASCADE,
    step_number INT,
    action TEXT,
    expected_result TEXT
);
CREATE TABLE test_suites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE test_suite_cases (
    suite_id UUID REFERENCES test_suites(id) ON DELETE CASCADE,
    testcase_id UUID REFERENCES test_cases(id) ON DELETE CASCADE,
    PRIMARY KEY (suite_id, testcase_id)
);
CREATE TABLE test_executions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    testcase_id UUID REFERENCES test_cases(id) ON DELETE CASCADE,
    executed_by UUID REFERENCES users(id),
    status VARCHAR(20) CHECK (status IN ('Pass','Fail','Blocked','Skipped')),
    comments TEXT,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_testcases_project ON test_cases(project_id);
CREATE INDEX idx_executions_testcase ON test_executions(testcase_id);
CREATE INDEX idx_users_email ON users(email);
ALTER TABLE test_suites
ADD COLUMN description TEXT;

ALTER TABLE test_suites
ADD COLUMN created_by UUID REFERENCES users(id);
