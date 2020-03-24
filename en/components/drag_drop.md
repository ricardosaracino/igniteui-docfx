---
title: Angular Drag and Drop | IgniteUI for Angular | Infragistics
_description: Learn how to use the Ignite UI for Angular Drag and Drop directives to perform dragging of elements around the page.
_keywords: Angular, UI Controls, Ignite UI for Angular Drag and Drop, Ignite UI for Angular, Infragistics
---

## Drag and Drop
<p class="highlight">The Ignite UI for Angular Drag and Drop directives enable dragging of elements around the page. The supported features include free dragging, using a drag handle, drag ghost, animations and multiple drop strategies.</p>

Drag and drop icons to reposition them.

<div class="sample-container loading" style="height:325px">
    <iframe id="icons-sample-iframe" src='{environment:demosBaseUrl}/interactions/icons-sample' width="100%" height="100%" seamless frameBorder="0" onload="onSampleIframeContentLoaded(this);"></iframe>
</div>
<br/>

<div>
    <button data-localize="stackblitz" disabled class="stackblitz-btn" data-iframe-id="icons-sample-iframe" data-demos-base-url="{environment:demosBaseUrl}">view on stackblitz</button>
</div>

<div class="divider--half"></div>

### Drag Directive

When an element inside your Angular application needs to be moved from one place to another on the page, the [`igxDrag`]({environment:angularApiUrl}/classes/igxdragdirective.html) directive is designed to help you achieve this behavior. In combination with the [`igxDrop`]({environment:angularApiUrl}/classes/igxdropdirective.html) directive that allows you to place the element being dragged, you can have a fully interactive application.

#### Fundamentals

A drag operation starts when the end user moves the pointer at least 5px in any direction. This behavior is customizable and can be changed using the [`dragTolerance`]({environment:angularApiUrl}/classes/igxdragdirective.html#dragtolerance) input. Otherwise, the interaction is considered a click and a `dragClick` event is triggered.

When dragging starts, the [`dragStart`]({environment:angularApiUrl}/classes/igxdragdirective.html#dragstart) event is triggered. To prevent any actual movement from occuring, the event can be canceled by setting the [`cancel`]({environment:angularApiUrl}/interfaces/idragstarteventargs.html#cancel) property to `true`.

Before any actual movement is performed, the [`dragMove`]({environment:angularApiUrl}/classes/igxdragdirective.html#dragmove) event is triggered containing the last and next positions of the pointer. This event gets triggered every time a movement is detected while dragging an element. 

After the user releases the pointer, the drag ghost element is removed from the DOM and the [`dragEnd`]({environment:angularApiUrl}/classes/igxdragdirective.html#dragend) event is emitted.

> [!Note]
> Due to the nature of the [`dragMove`]({environment:angularApiUrl}/classes/igxdragdirective.html#dragmove) event, it can be triggered many times in a short period of time. This may cause performance issues in complex scenarios.

#### The Ghost Element

The [`igxDrag`]({environment:angularApiUrl}/classes/igxdragdirective.html) directive can be applied to any DOM element.

```html
<div igxDrag>Drag me</div>
```

The default behavior of the `igxDrag` directive is to leave the base element unmodified and create a ghost element when a drag operation is performed by the end user.

Before the ghost element is rendered on the page, a [`ghostCreate`]({environment:angularApiUrl}/classes/igxdragdirective.html#ghostcreate) event is triggered containing information about the element that is about to be created. The event is triggered right after the [`dragStart`]({environment:angularApiUrl}/classes/igxdragdirective.html#dragstart) event. If the [`dragStart`]({environment:angularApiUrl}/classes/igxdragdirective.html#dragstart) event is canceled, no ghost will be created and the [`ghostCreate`]({environment:angularApiUrl}/classes/igxdragdirective.html#ghostcreate) event will not fired.

Right before the ghost element is removed, the [`ghostDestroy`]({environment:angularApiUrl}/classes/igxdragdirective.html#ghostcreate) event is triggered.

#### Customizing The Ghost

The ghost element, by default, is a copy of the original element the `igxDrag` directive is applied to. It can be customized by providing a template reference to the [`ghostTemplate`](environment:angularApiUrl}/classes/igxdragdirective.html#ghostTemplate) input.

```html
<div class="email-content flexlist"
	igxDrag
	[ghostTemplate]="customGhost">
	<div class="sender">
	    {{email.sender}} 
	</div>
	<div class="email-title">
	    {{email.title}}
	</div>
</div>
<ng-template #customGhost>
	<div class="dragGhost">
	    <igx-icon fontSet="material">email</igx-icon> 
	    Moving {{ draggedElements }} item{{ (draggedElements > 1 ? 's' : '')}}
	</div>
</ng-template>

```

#### Dragging Without Ghost

If you would like to move the base element, to which the `igxDrag` directive is applied, you can do so by setting the [`ghost`]({environment:angularApiUrl}/classes/igxdragdirective.html#ghost) input to `false`. That way there will be no extra ghost element created. If you want to apply custom styling to an element that is being dragged, you can do so by styling it directly.

```html
<div igxDrag [ghost]="false">Drag me</div>
```

#### Dragging Using a Handle

By default, the entire visible surface of the target element is used as one big drag handle. You can specify additional elements, descendants of the `igxDrag` directive element, to be used as drag __handles__ using the `igxDragHandle` directive.

```html
<div
    igxDrag 
    [ghost]="false"
    [dragTolerance]="0"
    (dragMove)=onDragMove($event)>
	<igx-icon igxDragHandle class="dialogHandle">drag_indicator</igx-icon>
	<div class="igx-dialog__window">
    </div>
</div>
```

<div class="sample-container loading" style="height:325px">
    <iframe id="drag-dialog-sample-iframe" src='{environment:demosBaseUrl}/interactions/drag-dialog-sample' width="100%" height="100%" seamless frameBorder="0" onload="onSampleIframeContentLoaded(this);"></iframe>
</div>
<br/>
<div>
<button data-localize="stackblitz" disabled class="stackblitz-btn" data-iframe-id="drag-dialog-sample-iframe" data-demos-base-url="{environment:demosBaseUrl}">view on stackblitz</button>
</div>
<div class="divider--half"></div>

#### Animations

When an element is being dragged, there are no animations applied by default.

You can apply a transition animation to the `igxDrag` element at any time. It is, however, advised to use animations when dragging ends or the element is not being dragged. This can be achieved by using the [`transitionToOrigin`](environment:angularApiUrl}/classes/igxdragdirective.html#transitiontoorigin) and the [`transitionTo`](environment:angularApiUrl}/classes/igxdragdirective.html#transitionto) methods.

The `transitionToOrigin` method, as the name suggests, animates the currently dragged element or its ghost to the start position where the dragging started. The `transitionTo` method animates the element to a specific location, relative to the page, (i.e. `pageX` and `pageY`) or to the position of another element. If the element is not being currently dragged, it will animate anyway or create a ghost and animate it to the desired position.

Both functions have arguments that allow you to customize the transition animation, set its duration, timing function, and delay. If a specific start position is provided, it will animate the element starting from those coordinates.

When the transition animation ends and a ghost element was created, it will be removed and the `igxDrag` directive will return to its initial state. If no ghost was created, the original element will keep its position. In both cases, the [`transitioned`]({environment:angularApiUrl}/classes/igxdragdirective.html#transitioned) event will be triggered after the transition completes. If no animation is applied, the event will be triggered immediately.

You can apply all types of animations, including element transformations. Those can be accomplished by using the [Angular Animations](https://angular.io/guide/animations) module, or by applying plain CSS animations to either the base `igxDrag` element or its ghost. If you want to apply custom animations to the ghost element, you would need to define a custom ghost and apply them to that element.

Reorder the items in the list using the drag handle. While dragging an item, the other items will re-order with animation. 

<div class="sample-container loading" style="height:380px">
    <iframe id="list-reorder-sample-iframe" src='{environment:demosBaseUrl}/interactions/list-reorder-sample' width="100%" height="100%" seamless frameBorder="0" onload="onSampleIframeContentLoaded(this);"></iframe>
</div>
<br/>
<div>
<button data-localize="stackblitz" disabled class="stackblitz-btn" data-iframe-id="list-reorder-sample-iframe" data-demos-base-url="{environment:demosBaseUrl}">view on stackblitz</button>
</div>
<div class="divider--half"></div>

### Drop Directive

When a dragged element has to be placed in an specific area, the [`igxDrop`]({environment:angularApiUrl}/classes/igxdropdirective.html) can be used to achieve this behavior. It fires events when another element enters the boundaries of the element the `igxDrop` directive is applied to or when an element is released inside those boundaries.

The [`igxDrop`]({environment:angularApiUrl}/classes/igxdropdirective.html) directive can be applied to any DOM element, just like the [`igxDrag`]({environment:angularApiUrl}/classes/igxdragdirective.html) directive.

By default, the [`igxDrop`]({environment:angularApiUrl}/classes/igxdropdirective.html) directive doesn't provide any logic for modifying the dragged element's position in the DOM. That's why you need to specify a [`dropStrategy`]({environment:angularApiUrl}/classes/igxdropdirective.html#dropstrategy) or provide your own custom logic. Drop strategies are discussed in the next section.

#### Drop Strategies

The `igxDrop` comes with 4 pre-defined drop strategies, namely `Default`, `Prepend`, `Insert`, and `Append`.

* `Default` - does not perform any action when an element is dropped onto an `igxDrop` element and is implemented as a class named [`IgxDefaultDropStrategy`]({environment:angularApiUrl}/classes/igxdefaultdropstrategy.html).

* `Append` - always inserts the dropped element as a last child and is implemented as a class named [`IgxAppendDropStrategy`]({environment:angularApiUrl}/classes/igxappenddropstrategy.html). 

* `Prepend` - always inserts the dropped element as first child and is implemented as a class named [`IgxPrependDropStrategy`]({environment:angularApiUrl}/classes/igxprependdropstrategy.html).

* `Insert` - inserts the dragged element at last position. If there was a child under the element when it was dropped, though, the `igxDrag` instanced element will be inserted at that child's position and the other children will be shifted. It is implemented as a class named [`IgxInsertDropStrategy`]({environment:angularApiUrl}/classes/igxinsertdropstrategy.html).

The way a strategy can be applied is by setting the `dropStrategy` input to one of the listed classes above. The value provided has to be a type reference and not an instance, since the `igxDrop` needs to create and manage the instance itself.

```typescript
public appendStrategy = IgxAppendDropStrategy;
```

```html
<div igxDrop [dropStrategy]="appendStrategy"></div>
```

##### Canceling Strategies

When using a specific drop strategy, its behavior can be canceled in the emitted [`dropped`]({environment:angularApiUrl}/classes/igxdropdirective.html#dropped) event by setting the `cancel` property to true. The `dropped` event is specific to the `igxDrop` directive. If you don't have a drop strategy provided to the `igxDrop` directive, canceling the event would have no effect.

```html
<div igxDrag></div>
<!-- ... -->
<div igxDrop (dropped)="onDropped($event)"></div>
```

```typescript
public onDropped(event) {
    event.cancel = true;
}
```

If you want to implement your own drop logic, we advise binding to the `dropped` event and executing your logic there or by extending the `IgxDefaultDropStrategy` class.

#### Linking Drag and Drop Elements
Using the [`dragChannel`]({environment:angularApiUrl}/classes/igxdragdirective.html#dragchannel) and [`dropChannel`]({environment:angularApiUrl}/classes/igxdropdirective.html#dropchannel) inputs on the `igxDrag` or `igxDrop` directives, respectively, you can link different elements to interact only between each other. For example, if an `igxDrag` element needs to be constrained so it can be dropped on a specific `igxDrop` element only, this can be achieved by assigning them to the same channel.

```html
<div igxDrag [dragChannel]="['Mammals', 'Land']">Human</div>
<div igxDrag [dragChannel]="['Mammals', 'Water']">Dolphin</div>
<div igxDrag [dragChannel]="['Insects', 'Air']">Butterfly</div>
<div igxDrag [dragChannel]="['Insects', 'Land']">Ant</div>

<div igxDrop [dropChannel]="['Mammals']">Mammals</div>
<div igxDrop [dropChannel]="['Insects']">Insects</div>
<div igxDrop [dropChannel]="['Land']">Land</div>
```

Drag emails on the right into the folders on the left.

<div class="sample-container loading" style="height:340px">
    <iframe id="email-sample-iframe" src='{environment:demosBaseUrl}/interactions/email-sample' width="100%" height="100%" seamless frameBorder="0" onload="onSampleIframeContentLoaded(this);"></iframe>
</div>
<br/>
<div>
<button data-localize="stackblitz" disabled class="stackblitz-btn" data-iframe-id="email-sample-iframe" data-demos-base-url="{environment:demosBaseUrl}">view on stackblitz</button>
</div>
<div class="divider--half"></div>

### Advanced Examples

Since both the `igxDrag` and `igxDrop` directives combined can be used in many different and complex application scenarios, the following example demonstrates how they can be used to create a Kanban board. 

The user could reorder the cards in each column. This is done by making each card a drop area so we can detect when another card has entered its boundaries and switch them around at runtime.

It won't be a Kanban board without the ability to move cards between columns. A card can be moved from one column to another at a specific position. We generate a dummy placeholder element that creates a padding area where the card being dragged will be positioned when it's released. The dummy element is removed once the card is dropped, or when the card leaves its current column.

Drag items around the kanban board.

<div class="sample-container loading" style="height:700px">
    <iframe id="kanban-sample-iframe" src='{environment:demosBaseUrl}/interactions/kanban-sample' width="100%" height="100%" seamless frameBorder="0" onload="onSampleIframeContentLoaded(this);"></iframe>
</div>
<br/>
<div>
<button data-localize="stackblitz" disabled class="stackblitz-btn" data-iframe-id="kanban-sample-iframe" data-demos-base-url="{environment:demosBaseUrl}">view on stackblitz</button>
</div>
<div class="divider--half"></div>

### API
* [IgxDragDirective]({environment:angularApiUrl}/classes/igxdragdirective.html)
* [IgxDropDirective]({environment:angularApiUrl}/classes/igxdropdirective.html)
* [IgxDefaultDropStrategy]({environment:angularApiUrl}/classes/igxdefaultdropstrategy.html)
* [IgxAppendDropStrategy]({environment:angularApiUrl}/classes/igxappenddropstrategy.html)
* [IgxPrependDropStrategy]({environment:angularApiUrl}/classes/igxprependdropstrategy.html)
* [IgxInsertDropStrategy]({environment:angularApiUrl}/classes/igxinsertdropstrategy.html)

### References

<div class="divider--half"></div>
Our community is active and always welcoming to new ideas.

- [Ignite UI for Angular **Forums**](https://www.infragistics.com/community/forums/f/ignite-ui-for-angular)
- [Ignite UI for Angular **GitHub**](https://github.com/IgniteUI/igniteui-angular)
