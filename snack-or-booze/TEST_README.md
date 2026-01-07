# Snack or Booze - Test Suite

This project includes a comprehensive test suite using **Vitest** and **React Testing Library** to ensure code quality and prevent regressions.

## Test Coverage

### 🧪 API Tests (`Api.test.js`)
- ✅ GET requests for snacks and drinks
- ✅ POST requests for adding new items
- ✅ Error handling for API failures
- ✅ Correct endpoint URLs and data formatting

### 🏠 Component Tests

#### Home Component (`Home.test.jsx`)
- ✅ Renders welcome message
- ✅ Displays correct item counts
- ✅ Handles empty data arrays

#### Menu Component (`Menu.test.jsx`)
- ✅ Renders menu titles and items
- ✅ Generates correct navigation links
- ✅ Handles empty item arrays
- ✅ Supports both snacks and drinks

#### Item Detail Component (`Item.test.jsx`)
- ✅ Displays complete item information
- ✅ Shows recipe and serving instructions
- ✅ Handles item not found scenarios

#### Navigation Bar (`NavBar.test.jsx`)
- ✅ Renders brand and navigation links
- ✅ Correct link destinations
- ✅ Proper navigation structure

#### Add Item Form (`AddItem.test.jsx`)
- ✅ Form rendering and structure
- ✅ User input handling
- ✅ Form submission for snacks and drinks
- ✅ API integration and navigation
- ✅ Error handling

#### 404 Page (`NotFound.test.jsx`)
- ✅ Displays 404 message and explanation
- ✅ Navigation buttons for recovery
- ✅ Correct link destinations

### 🏗️ Integration Tests (`App.test.jsx`)
- ✅ Loading states
- ✅ Navigation between pages
- ✅ API error handling
- ✅ Overall app structure

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test Api.test.js
```

## Test Configuration

- **Framework**: Vitest
- **UI Library**: React Testing Library
- **Environment**: jsdom (for DOM simulation)
- **Matchers**: @testing-library/jest-dom
- **Mocking**: Axios requests are mocked

## Test Structure

```
src/
├── test/
│   └── setup.js             # Test configuration and global setup
├── *.test.js                 # API and utility tests
├── *.test.jsx                # React component tests
└── App.test.jsx              # Integration tests
```

## Key Testing Patterns

### Component Testing
```javascript
import { render, screen } from '@testing-library/react';

test('renders component', () => {
  render(<MyComponent />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### User Interaction Testing
```javascript
import userEvent from '@testing-library/user-event';

test('handles user input', async () => {
  const user = userEvent.setup();
  render(<FormComponent />);

  await user.type(screen.getByLabelText('Name'), 'John Doe');
  await user.click(screen.getByRole('button', { name: 'Submit' }));

  expect(mockSubmit).toHaveBeenCalledWith({ name: 'John Doe' });
});
```

### API Mocking
```javascript
import axios from 'axios';
vi.mock('axios');

test('fetches data', async () => {
  mockedAxios.get.mockResolvedValue({ data: mockData });
  // ... test implementation
});
```

## Continuous Integration

Tests are designed to run in CI/CD environments and provide fast feedback on code changes. The test suite ensures:

- ✅ No regressions in existing functionality
- ✅ New features work as expected
- ✅ API integrations remain stable
- ✅ User interactions behave correctly
- ✅ Error states are handled gracefully

## Contributing

When adding new features:
1. Write tests first (TDD approach)
2. Ensure all tests pass
3. Maintain test coverage above 80%
4. Follow existing testing patterns

When fixing bugs:
1. Write a test that reproduces the bug
2. Fix the bug
3. Ensure the test passes
4. Verify no other tests are broken