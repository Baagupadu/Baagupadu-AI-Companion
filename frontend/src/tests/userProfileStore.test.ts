import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useUserProfileStore } from '../stores/userProfileStore';
import * as api from '../lib/api';

vi.mock('../lib/api');

describe('useUserProfileStore', () => {
  beforeEach(() => {
    useUserProfileStore.setState({
      profile: null,
      isLoading: true,
      completedTasks: {},
    });
    vi.clearAllMocks();
  });

  it('should initialize with default empty state', () => {
    const state = useUserProfileStore.getState();
    expect(state.profile).toBeNull();
    expect(state.isLoading).toBe(true);
    expect(state.completedTasks).toEqual({});
  });

  it('should toggle tasks state correctly', () => {
    const store = useUserProfileStore.getState();
    
    // Toggle task-1 to true
    store.toggleTask('task-1');
    expect(useUserProfileStore.getState().completedTasks['task-1']).toBe(true);

    // Toggle task-1 again to false
    useUserProfileStore.getState().toggleTask('task-1');
    expect(useUserProfileStore.getState().completedTasks['task-1']).toBe(false);
  });

  it('should load profile successfully on valid token', async () => {
    const mockProfileData = {
      user_id: 'user_123',
      session_progress: {
        current_phase: 'trust',
        current_sub_phase: null,
        phase_completed: [],
        phase_progress: { trust: 50 },
      },
      life_stage_data: {},
      inferences: {},
      patterns: {},
      persona: {},
      guidance: {},
      conversation_memory: {
        last_5_exchanges: [],
        phase_summaries: {},
        blocked_topics: [],
        unresolved_topics: [],
      },
    };

    vi.spyOn(api, 'fetchProfile').mockResolvedValueOnce(mockProfileData);

    await useUserProfileStore.getState().loadProfile('test-bearer-token');

    const state = useUserProfileStore.getState();
    expect(state.isLoading).toBe(false);
    expect(state.profile).toEqual(mockProfileData);
    expect(state.profile?.session_progress.current_phase).toBe('trust');
  });

  it('should handle fetchProfile errors gracefully without throwing', async () => {
    vi.spyOn(api, 'fetchProfile').mockRejectedValueOnce(new Error('Network error'));

    await useUserProfileStore.getState().loadProfile('invalid-token');

    const state = useUserProfileStore.getState();
    expect(state.isLoading).toBe(false);
    expect(state.profile).toBeNull();
  });
});
