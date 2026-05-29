import { describe, it, expect } from 'vitest';
import { getSafeUrl } from './security';

describe('getSafeUrl', () => {
  it('returns # for undefined or empty URLs', () => {
    expect(getSafeUrl(undefined)).toBe('#');
    expect(getSafeUrl('')).toBe('#');
    expect(getSafeUrl('   ')).toBe('#');
  });

  it('allows safe http and https protocols', () => {
    expect(getSafeUrl('https://example.com')).toBe('https://example.com');
    expect(getSafeUrl('http://example.com')).toBe('http://example.com');
  });

  it('allows relative paths and anchors', () => {
    expect(getSafeUrl('/about')).toBe('/about');
    expect(getSafeUrl('#contact')).toBe('#contact');
  });

  it('allows mailto and tel protocols', () => {
    expect(getSafeUrl('mailto:hello@example.com')).toBe('mailto:hello@example.com');
    expect(getSafeUrl('tel:+1234567890')).toBe('tel:+1234567890');
  });

  it('blocks unsafe protocols like javascript: and data:', () => {
    expect(getSafeUrl('javascript:alert(1)')).toBe('#');
    expect(getSafeUrl('  JaVaScRiPt:alert(1)')).toBe('#');
    expect(getSafeUrl('data:text/html,<script>alert(1)</script>')).toBe('#');
    expect(getSafeUrl('vbscript:msgbox("hello")')).toBe('#');
  });

  it('preserves the original case of safe URLs', () => {
    expect(getSafeUrl('https://Example.COM/Path')).toBe('https://Example.COM/Path');
  });
});
