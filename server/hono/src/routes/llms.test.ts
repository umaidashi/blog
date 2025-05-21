import app from '../index'; // Adjusted path from ../../src/index

// Mocking a simple test structure
const describe = (description: string, fn: () => void) => {
  console.log(description);
  fn();
};

const it = (description: string, fn: () => Promise<void> | void) => {
  console.log(`  ${description}`);
  return Promise.resolve(fn()).catch(err => {
    console.error(`    FAILED: ${err.message}`);
    process.exitCode = 1; 
  });
};

const expect = (actual: any) => ({
  toBe: (expected: any) => {
    if (actual !== expected) {
      throw new Error(`Expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`);
    }
    console.log('    PASSED');
  },
  toContain: (expectedSubstring: string) => {
    if (typeof actual !== 'string' || !actual.includes(expectedSubstring)) {
      throw new Error(`Expected "${actual}" to contain "${expectedSubstring}"`);
    }
    console.log('    PASSED');
  },
  toBeGreaterThan: (expected: number) => {
    if (typeof actual !== 'number' || actual <= expected) {
      throw new Error(`Expected ${actual} to be greater than ${expected}`);
    }
    console.log('    PASSED');
  }
});

describe('GET /llms.txt', () => {
  it('should return profile information in Markdown format', async () => {
    const res = await app.request('/llms.txt');
    
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('text/markdown; charset=UTF-8');
    
    const text = await res.text();
    expect(text.length).toBeGreaterThan(0);
    expect(text).toContain('# oidon. - umaidashi');
    expect(text).toContain('## About');
    expect(text).toContain('## Skills');
    expect(text).toContain('Go'); // Example skill
    expect(text).toContain('### Languages');
    expect(text).toContain('Gin'); // Example framework
    expect(text).toContain('Prisma'); // Example library
    expect(text).toContain('PostgreSQL'); // Example RDBMS
    expect(text).toContain('Neovim'); // Example Other
  });
});

// Helper to run tests if this file is executed directly (e.g., with bun run server/hono/src/routes/llms.test.ts)
// This is a simplified runner. A proper test runner like vitest or jest would be better.
if (import.meta.path === process.argv[1] || import.meta.path.endsWith('.ts')) {
  console.log('Running tests...');
  // Potentially, one would aggregate test results here.
  // For now, errors are logged and process.exitCode is set.
}
