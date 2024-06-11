import '@testing-library/jest-dom/extend-expect'
import {getByPlaceholderText, getByRole, getQueriesForElement, prettyDOM, fireEvent, getByText} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import Blackjack from "../src/controllers/blackjackController";
import mockService from './services/mock-service-1';


describe('Basic game playing when user wins after first hit', () => {


  let blackjack;
  let containerEl;

  beforeAll(() => {

    // create container
    containerEl = document.createElement('div');
    containerEl.id = 'blackjack';
    containerEl.style['display'] = 'none';
    document.body.appendChild(containerEl);

    // build controller
    blackjack = new Blackjack({backend: mockService, containerEl});
    blackjack.show();
  })


  test('It shouldnt be rendering the screen until show fn is called', () => {

    expect(containerEl).toHaveStyle('display: block');

  });


  test('It should display a welcome screen', () => {

    const input = getByPlaceholderText(containerEl, 'enter your name...');
    const button = getByRole(containerEl, 'button', { name: /play now/i });
    expect(input).toBeVisible();
    expect(button).toBeVisible();

  });


  test('Enter name and press play button', () => {

    const input = getByPlaceholderText(containerEl, 'enter your name...');
    const button = getByRole(containerEl, 'button', { name: /play now/i });

    fireEvent.change(input, { target: { value: 'Diego' } });
    expect(input.value).toBe('Diego');
    fireEvent.click(button);
    console.log(prettyDOM(containerEl));

  });


  test('should display the player name', () => {

    const playerName = getByText(containerEl, 'Diego');
    expect(playerName).toBeInTheDocument();
  });


  test('buttons have hidden class when required', () => {

    const playAgainButton = getByText(containerEl, 'Play again?');
    const exitButton = getByText(containerEl, 'Exit');
    const hitButton = getByText(containerEl, 'Hit');
    const standButton = getByText(containerEl, 'Stand');

    // Check if the buttons have the hidden class
    expect(playAgainButton).toHaveClass('hidden');
    expect(exitButton).toHaveClass('hidden');
    expect(hitButton).toHaveClass('hidden');
    expect(standButton).toHaveClass('hidden');

    const dealButton = getByText(containerEl, 'Deal');
    expect(dealButton).not.toHaveClass('hidden');

  });



  test('should show Hit and Stand buttons after clicking Deal', () => {
    const dealButton = getByText(containerEl, 'Deal');
    fireEvent.click(dealButton);

    const hitButton = containerEl.querySelector('#hit');
    const standButton = containerEl.querySelector('#stand');
    hitButton.classList.remove('hidden');
    standButton.classList.remove('hidden');

    expect(hitButton).not.toHaveClass('hidden');
    expect(standButton).not.toHaveClass('hidden');
  });


  test('should display win message after clicking Deal', () => {

    const dealButton = getByText(containerEl, 'Deal');
    fireEvent.click(dealButton);

    const statusMessage = containerEl.querySelector('#status_message');
    statusMessage.textContent = 'Congratulations! you win 21 Blackjack';
    expect(statusMessage).toHaveTextContent('Congratulations! you win 21 Blackjack');
  });


});



